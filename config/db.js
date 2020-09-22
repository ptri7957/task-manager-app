const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.get("mongoURI"), {
            'useNewUrlParser': true,
            'useFindAndModify': false,
            'useCreateIndex': true,
            'useUnifiedTopology': true
        });
        console.log("MongoDB running");
    } catch (error) {
        console.log("Cannot connect to DB");
    }
}

module.exports = connectDB;