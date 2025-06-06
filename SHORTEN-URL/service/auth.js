const jwt = require("jsonwebtoken");
const secret = "CHIRAG$123@987";

function setUser(user) {
//   const payload = { id: user._id.toString() };
  return jwt.sign({
    _id : user._id,
    email : user.email,
  }, secret);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; 
  }
}

module.exports = {
  setUser,
  getUser,
};
