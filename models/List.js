const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    }
});

const List = mongoose.model("List", listSchema);

module.exports = List;