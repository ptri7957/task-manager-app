const express = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({
                errors: [{
                    msg: "User already exists."
                }]
            })
        }

        user = new User({
            username: username,
            email: email,
            password: password
        });

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if(err){
                    throw err;
                }else{
                    return res.json({token});
                }
            }
        );
    } catch (error) {
        return res.status(500).json({
            errors: [{
                msg: "Server Error"
            }]
        });
    }
});

module.exports = router;