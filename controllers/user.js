const user = require("router")();
const { getUserByEmail, verifyPassword, createUser, updateUser, deleteUser } = require("../services/user");

user.post("/register", async (req, res) => {
  try {
    if(!req.body.email) return res.status(401).json({error: "Please provide an email address."});
    if(!req.body.password) return res.status(401).json({error: "Please provide a password."});

    const userObj = await createUser(req.body);
    if(!userObj.id) return res.status(401).json({error: "There was an error please try again"});
    return res.status(200).json({userObj});
  } catch (error) {
    console.log(`Register: ${error}`);
    res.status(401).json(error);
  }
});

user.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  if (!email) return res.status(401).json({error: "EMAIL_EMPTY"});
  if (!password)
    return res.status(401).json({error: "PASSWORD_EMPTY"});
  
  try {
    // logger.debug("Login with email", username);
    const userObj = await getUserByEmail({email: email});
    if (!userObj) {
      return done("USER_NOT_PRESENT", null);
    }
    if (verifyPassword(userObj, password)) {
      await updateUser({active: true}, userObj.userId);
      return res.status(200).json({userObj});
    } else {
      return res.status(401).json({error: "INVALIDPASSWORD"});
    }
  } catch (error) {
    console.log("Login: ", error);
    return res.status(401).json({error});
  }
});

user.put("/signout", async (req, res) => {
  try {
    const userObj = await updateUser({active: false}, req.body.userId);
    if(!userObj) return res.status(401).json("User not found");
    return res.status(200).json(`User with email ${userObj.email} signed out.`);
  } catch (error) {
    console.log("Logout: ", error);
    return res.status(401).json({error});
  }
});

user.delete("/delete", async (req, res) => {
  try {
    const userObj = await deleteUser(req.body.userId);
    if(!userObj) return res.status(401).json("User not found");
    return res.status(200).json(`User with email ${userObj.email} deleted.`);
  } catch (error) {
    console.log("Delete: ", error);
    return res.status(401).json({error});
  }
})

module.exports = user;