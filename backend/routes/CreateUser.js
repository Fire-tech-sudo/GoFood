const express = require("express")
const router = express.Router()
require("dotenv").config();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/createuser", [
    body("email", "Incorrect Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });
    }
    catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})


router.post("/loginuser", [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 })
], async (req, res) => {
    let email = req.body.email;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.json({ success: true, authtoken: authtoken });
    }
    catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})

module.exports = router;