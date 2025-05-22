// const http = require("node : http");
const http = require("http");
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
});

app.get('/about', (req, res) => {
    return res.send("Hello from About Page " + req.query.name + " your age is :- " + req.query.age);
});

app.listen(8000, () => console.log('Server started!!'))