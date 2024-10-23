const { inventory_transactions } = require("../models");

exports.getInventory = async (req, res) => {
    try {
        const { id, role } = req.user;
        if (role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }
        const inventory = await inventory_transactions.findAll();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


