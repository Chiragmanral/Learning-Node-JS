const express = require("express");
let users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 4444;

// Middleware
app.use(express.urlencoded({ extended : false })); // Built-in Middleware

// Custom Middleware
app.use((req, res, next) => {
    console.log("Middleware 1");
    next();
    // return res.json({ msg : "This is middleware 1"});
})

app.use((req, res, next) => {
    console.log("Middleware 2");
    next();
    // return res.json({ msg : "This is middleware 2"});
})

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the home page!!");
})

// Sidha rendered HTML document bheja hai server ne ehich means ki SSR(Server side rendering hai), it's fast bcz server khud pura rendered HTML document bhej rha hai clent ke pass, client ko buss usse show kar dena hai screen par directly.
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//API bheji hai server ne toh, it means CSR(Client Side Rendering) hai client khud apne hisaab se render kar lega json data ko into html document, but it's slow bcz pehle server json data bhejega then fir client uss json data ko khud render karega.

app.route("/api/users")
.get((req, res) => { 
    return res.json(users);
})
.post((req, res) => {
    const body = req.body;
    users.push({id : users.length + 1, ...body});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users) , (err, result) => {
        return res.json({status : "success", id : users.length});
    })
});

app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    let updateUser = users.find((user) => user.id === id);

    if(updateUser) {
        updateUser.first_name = body.first_name;
        updateUser.last_name = body.last_name;
        updateUser.email = body.email;
        updateUser.gender = body.gender;
        updateUser.job_title = body.job_title;
        
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
            return res.json({status : "updated successfully", updatedId : id});
        })
    }
    else {
        return res.send(`This id :- ${id} does not exist!!!`);
    }
})
.delete((req, res) => {
    const id = Number(req.params.id);
    users = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
        return res.json({status : "deleted successfully", deletedId : id});
    })
});

app.listen(PORT, () => console.log(`Server started at PORT :- ${PORT}`));