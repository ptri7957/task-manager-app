const express = require("express");
const List = require("../../models/List");
const auth = require("../../auth/auth");

const router = express.Router();

// Get all user lists
router.get("/", auth, async (req, res) => {
  try {
      const lists = await List.find({user: req.user.id});
      if(!lists){
          return res.status(400).json({
              errors: [{
                  msg: "Lists not found."
              }]
          });
      }
      return res.json(lists);
  } catch (error) {
    return res.status(500).json({
      errors: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
});

// Create new List
router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  try {
    const list = new List({
      user: req.user.id,
      title: title,
    });

    await list.save();
    return res.json(list);
  } catch (error) {
    return res.status(500).json({
      errors: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
});

router.delete("/:list_id", auth, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.list_id);
    return res.json({
      msg: "List removed.",
    });
  } catch (error) {
    return res.status(500).json({
      errors: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
});

module.exports = router;
