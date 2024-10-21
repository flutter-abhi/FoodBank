const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const signup = async (req, res) => {
    console.log("signup");
    try {
        const { name, phone, role, password } = req.body;
        console.log(req.body);
        // Check if all required fields are present
        if (!name || !phone || !role || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the phone number already exists
        const existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
            return res.status(400).json({ error: "Phone number already in use" });
        }

        // Hash the password    
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user if all fields are valid
        const user = await User.create({ name, phone, role, password: hashedPassword });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '240h' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    console.log("login");
    try {
        const { phone, password } = req.body;
        console.log(req.body);
        // Check if all required fields are present
        if (!phone || !password) {
            return res.status(400).json({ error: "Phone number and password are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            return res.status(400).json({ error: "Invalid phone number or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid phone number or password" });
        }

        // Generate token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '240h' });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    signup,
    login
};
