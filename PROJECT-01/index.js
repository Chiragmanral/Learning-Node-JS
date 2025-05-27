const express = require("express");
let users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 4444;

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/first-app")
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("MongoDB error", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    gender : {
        type : String
    },
    jobTitle : {
        type : String
    }
}, {timestamps : true});

// Model of the schema through which we interact with the database
const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended : false })); // Built-in Middleware

// Custom Middleware
// app.use((req, res, next) => {
//     console.log("Middleware 1");
//     next();
//     // return res.json({ msg : "This is middleware 1"});
// })

// app.use((req, res, next) => {
//     console.log("Middleware 2");
//     next();
//     // return res.json({ msg : "This is middleware 2"});
// })

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the home page!!");
})

// Sidha rendered HTML document bheja hai server ne ehich means ki SSR(Server side rendering hai), it's fast bcz server khud pura rendered HTML document bhej rha hai clent ke pass, client ko buss usse show kar dena hai screen par directly.
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//API bheji hai server ne toh, it means CSR(Client Side Rendering) hai client khud apne hisaab se render kar lega json data ko into html document, but it's slow bcz pehle server json data bhejega then fir client uss json data ko khud render karega.

app.route("/api/users")
.get(async (req, res) => { 
    const allDbUsers = await User.find({});
    return res.send(allDbUsers);
})
.post( async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
        return res.status(400).json({msg : "All fields are required!!"});
    }

    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title
    })

    console.log("result", result);
    return res.status(201).json({ msg : "created successfully"});
});

app.route('/api/users/:id')
.get(async (req, res) => {
    const user = await User.findById(req.params.id); 
    if(!user) return res.status(404).json({ Error : "User not found!!"});
    return res.send(user);
})
.patch(async (req, res) => {
    const body = req.body;
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title
    });

    if(updateUser) {
        return res.json({msg : "Updated Successfully"}); 
    }
    else {
        return res.send(`This id :- ${id} does not exist!!!`);
    }
})
.delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg : "Deleted Successfully"});
});

app.listen(PORT, () => console.log(`Server started at PORT :- ${PORT}`));