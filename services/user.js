const {User} = require("../models");

const createUser = async (body) => {
  try {
    return await User.create(body);
  } catch (error) {
    console.log(`Services - user: createUser() for - ${error}`);
    return Error("Error creating user");
  }
}

const getUserByEmail = async ({email}) => {
  try {
    return await models.User.findOne({
      where: {email}
    });
  } catch (error) {
    console.log(`Services - user: getUserByEmail() for - ${email} : ` + error);
    throw "USER_NOT_PRESENT";
  }
};

const updateUser = async (updates, userId) => {
  try {
    return await User.update(
      updates,
      {
        where: {userId}
      }
    );
  } catch (error) {
    console.log(`Services - user: updateUser() for - ${email} : ` + error);
    throw "Error updating user";
  }
}

const verifyPassword = async () => {
  try {
    return await User.findOne(
      password,
      {where: {email}}
    )
  } catch (error) {
    console.log(`Services - user: verifyPassword() for - ${email} : ` + error);
    throw "Error verifying password";
  }
}

const deleteUser = async (email) => {
  try {
    return await User.destroy({
      where: {email}
    })
  } catch (error) {
    console.log(`Services - user: deleteUser() for - ${email} : ` + error);
    throw "Error deleting user";
  }
}

module.exports = { getUserByEmail, verifyPassword, createUser, updateUser, deleteUser };