const express = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../auth/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Models
const User = require("../../models/User");

// @GET            /api/auth
// @Desc           Get authenticated user
// @Access         Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
});

// @POST           /api/auth
// @Desc           Login User
// @Access         Public
router.post(
  "/",
  [
    check("email", "Must have an email").not().isEmpty(),
    check("password", "Must enter a password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      // Check if user registered. Login if so.
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User not registered",
            },
          ],
        });
      } else {
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          return res.status(400).json({
            errors: [
              {
                msg: "Password is incorrect",
              },
            ],
          });
        } else {
          const payload = {
            user: {
              id: user.id,
              username: user.username,
            },
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 3600000 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                return res.json({ token });
              }
            }
          );
        }
      }
    } catch (e) {
      return res.status(500).json({
        error: [
          {
            msg: "Server Error",
          },
        ],
      });
    }
  }
);

module.exports = router;
