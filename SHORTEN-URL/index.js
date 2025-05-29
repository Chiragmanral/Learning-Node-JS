const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected successfully!!"))
.catch(err => console.log("Error in connecting with database", err));
 
app.use(express.json());

app.get("/test", (req, res) => {
     return res.end(`<h1>Hey from server</h1>`);
})

app.use("/url", urlRoute);

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
     res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
     console.log(`Server started at PORT: ${PORT}`);
})