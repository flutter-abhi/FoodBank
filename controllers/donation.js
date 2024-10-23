const { Donor, Food, DonationTable, inventory_transactions } = require("../models");
const Joi = require("joi"); // Import Joi

// Define the validation schema
const donationSchema = Joi.object({
    donarname: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).required(), // Ensure phone is numeric
    address: Joi.string().required(),
    foodname: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(), // Ensure quantity is a positive integer
    unit: Joi.string().required(),
    expiration_date: Joi.date().greater('now').required(), // Ensure expiration date is in the future
    category: Joi.string().required()
});

const createDonation = async (req, res) => {
    // Validate the request body
    const { error } = donationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Return validation error
    }
    console.log(req.body);

    try {
        // Donor details
        const { donarname, phone, address } = req.body;
        // Food details
        const { foodname, quantity, unit, expiration_date, category } = req.body;

        let donar = await Donor.findOne({ where: { phone } });
        if (!donar) {
            // Create donor 
            donar = await Donor.create({ name: donarname, phone, address });
        }
        // Create food
        const food = await Food.create({ name: foodname, donor_id: donar.donor_id, quantity, unit, expiration_date, category });

        // Create donation
        const donation = await DonationTable.create({ donar_id: donar.donor_id, food_id: food.food_item_id, quantity, transaction_type: "add" });

        ///

        ///
        /// ethe changes karaychi 
        // Create inventory transaction
        let inventory_tr = await inventory_transactions.findOne({ where: { food_item_id: food.food_item_id } });
        if (!inventory_tr) {
            inventory_tr = await inventory_transactions.create({ food_item_id: food.food_item_id, quantity, transaction_type: "add" });
        } else {
            inventory_tr.quantity += quantity;
            await inventory_tr.save();
        }

        res.status(200).json({ message: "Donation created successfully", donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createDonation
}
