const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authentications");
const { createDonation } = require("../controllers/donation");
const authMiddleware = require("../middleware/auth");
const { getInventory } = require("../controllers/getInventry");
const { distributeFood } = require("../controllers/distrubute");
const { updateFood, deleteFood } = require("../controllers/update_delet_food");
const { getDonationHistory } = require("../controllers/getDonationHistory");


///routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/donation", createDonation);
router.get("/getinventory", authMiddleware, getInventory);
router.post("/distribute", authMiddleware, distributeFood);
router.put("/updatefood", authMiddleware, updateFood);
router.delete("/deletefood", authMiddleware, deleteFood);
router.get("/getdonationhistory", getDonationHistory);
module.exports = router;
