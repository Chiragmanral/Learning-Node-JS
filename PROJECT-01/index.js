const express = require("express");

const { logReqRes } = require("./middlewares");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 4444;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/first-app")
.then(() => { console.log("MongoDb connected successfully ")})
.catch(err => { console.log("There is some error", err)});

// Middleware
app.use(express.urlencoded({ extended : false })); // Built-in Middleware

app.use(logReqRes("log.txt"));

// Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT :- ${PORT}`));