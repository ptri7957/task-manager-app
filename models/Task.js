const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;