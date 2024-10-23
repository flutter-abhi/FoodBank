const { FoodDistribution ,inventory_transactions} = require("../models");

exports.distributeFood = async (req, res) => {
    try {
        const { id, role } = req.user;
        if (role !== "admin" && role !== "volunteer") {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const { recipient_name, food_item_id, quantity } = req.body;

        // Validate input fields
        if (!recipient_name || !food_item_id || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

            let inventry = await inventory_transactions.findOne({ where: { food_item_id: food_item_id } });
            if (!inventry) {
                return res.status(400).json({ error: "Food item not found in inventory" });
            }else if(inventry.quantity < quantity){
                    return res.status(400).json({ error: "Insufficient quantity in inventory" });
            }else{
                inventry.quantity = inventry.quantity - quantity;
                await inventry.save();      
            }

        const distribution = await FoodDistribution.create({ recipient_name, food_item_id, quantity, distributed_by: id });
        

        res.status(200).json(distribution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
