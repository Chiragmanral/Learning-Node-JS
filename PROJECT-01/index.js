const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 4444;

// Routes

app.get("/", (req, res) => {
    res.send("Hello");
})

app.get("/users", (req, res) => {
    return res.json(users);
});

app.listen(PORT, () => console.log(`Server started at PORT :- ${PORT}`));