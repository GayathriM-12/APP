const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let tasks = [];
app.get("/", (req, res) => {
    res.render("index", { tasks });
});
app.post("/add", (req, res) => {
    const task = { name: req.body.task, completed: false };
    tasks.push(task);
    res.redirect("/");
});
app.post("/complete", (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex);
    if (!isNaN(taskIndex) && tasks[taskIndex]) {
        tasks[taskIndex].completed = true;
    }
    res.redirect("/");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
