const { DonationTable } = require("../models"); // Ensure this import is correct
exports.getDonationHistory = async (req, res) => {
    try {
        const { id } = req.body;
        const donations = await DonationTable.findAll({ where: { donar_id: id } });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   
