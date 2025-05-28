const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connection");

const app = express();
const PORT = 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected successfully!!"))
.catch(err => console.log("Error in connecting with database", err));

app.use("/url", urlRoute);

app.listen(PORT, () => {
     console.log(`Server started at PORT: ${PORT}`);
})