const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const list = require("./routes/api/list");
const task = require("./routes/api/task");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
connectDB();

// Mount API routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/lists", list);
app.use("/api/tasks", task);


app.use(express.static("client/build"));

if(process.env.NODE_ENV === "production"){
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running at port ${port}`));