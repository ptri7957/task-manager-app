const express = require("express");
const Task = require("../../models/Task");
const auth = require("../../auth/auth");
const { findById } = require("../../models/Task");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.json(tasks);
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

// Get all tasks related to list id
router.get("/:list_id", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ list: req.params.list_id });
    if (!tasks) {
      return res.status(400).json({
        errors: [
          {
            msg: "List does not exist",
          },
        ],
      });
    }

    return res.json(tasks);
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

// Create new task
router.post("/:list_id", auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    let task = new Task({
      user: req.user.id,
      list: req.params.list_id,
      title: title,
      description: description,
    });

    await task.save();
    return res.json(task);
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

// Delete Task
router.delete("/:list_id/:task_id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.task_id);
    return res.json({
      msg: "Task removed.",
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

router.put("/:list_id/:task_id", auth, async (req, res) => {
  try {
    let task = await findById(req.params.task_id);
    task.completed = !task.completed;
    await task.save();
    return res.json(task);
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
