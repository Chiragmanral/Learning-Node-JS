const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 4444;

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
    der
})

//API bheji hai server ne toh, it means CSR(Client Side Rendering) hai client khud apne hisaab se render kar lega json data ko into html document, but it's slow bcz pehle server json data bhejega then fir client uss json data ko khud render karega.

app.route("/api/users")
.get((req, res) => { 
    return res.json(users);
})
.post((req, res) => {
    // TODO : Create new user
    return res.json({status : "pending"});
});

app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    // TODO : Edit the user with id
    return res.json({status : "pending"});
})
.delete((req, res) => {
    // TODO : Delete the user with id
    return res.json({status : "pending"});
});

// app.post("/api/users", (req, res) => {
//     // TODO : Create new user
//     return res.json({status : "pending"});
// })

app.listen(PORT, () => console.log(`Server started at PORT :- ${PORT}`));