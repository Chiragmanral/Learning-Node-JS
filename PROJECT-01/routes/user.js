const express = require("express");
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleCreateNewUser, handleDeleteUserById} = require("../controllers/user");

const router = express.Router();

// Routes

// Sidha rendered HTML document bheja hai server ne ehich means ki SSR(Server side rendering hai), it's fast bcz server khud pura rendered HTML document bhej rha hai clent ke pass, client ko buss usse show kar dena hai screen par directly.
// router.get("/", async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// })

//API bheji hai server ne toh, it means CSR(Client Side Rendering) hai client khud apne hisaab se render kar lega json data ko into html document, but it's slow bcz pehle server json data bhejega then fir client uss json data ko khud render karega.

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

router.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;