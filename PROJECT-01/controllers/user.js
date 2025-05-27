const User = require("../models/user");

async function handleCreateNewUser(req, res) {
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
    return res.status(201).json({ msg : "created successfully", id : _id});
}

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id); 
    if(!user) return res.status(404).json({ Error : "User not found!!"});
    return res.send(user);
}

async function handleUpdateUserById(req, res) {
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
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg : "Deleted Successfully"});
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};