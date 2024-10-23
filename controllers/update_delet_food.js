
const Food = require("../models");

exports.updateFood = async (req, res) => {
    try {
        const { id, role } = req.user;
        if (role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }
        const { food_item_id, quantity, expiry_date } = req.body;
        const food = await Food.findByPk(food_item_id);
        if (!food) {
            return res.status(404).json({ error: "Food item not found" });
        }
        food.quantity = quantity;
        food.expiry_date = expiry_date;
        await food.save();
        res.status(200).json({ message: "Food item updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteFood = async (req, res) => {
    try {
        const { id, role } = req.user;
        if (role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }
        const { food_item_id } = req.body;
        const food = await Food.findByPk(food_item_id);
        if (!food) {
            return res.status(404).json({ error: "Food item not found" });
        }
        await food.destroy();
        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

