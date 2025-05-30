const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const { homedir } = require("os");

const app = express();
const PORT = 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected successfully!!"))
.catch(err => console.log("Error in connecting with database", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended : false }))

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
     const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate({ shortId }, {
          $push : {
               visitHistory : {
                    timestamp : Date.now()
               }
          }
     }
     )
     if(entry.redirectURL !== null) {
          res.redirect(entry.redirectURL);
     }
     else {
          res.end("Redirect URL does not exist!!");
     }
})

app.listen(PORT, () => {
     console.log(`Server started at PORT: ${PORT}`);
})