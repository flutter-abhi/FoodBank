const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authentications");
const { createDonation } = require("../controllers/donation");
const authMiddleware = require("../middleware/auth");

///routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/donation",  createDonation);

module.exports = router;
