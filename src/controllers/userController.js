import userService from "../services/userService";
const jwt = require("jsonwebtoken");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let pass_word = req.body.pass_word;
  if (!email || !pass_word) {
    return res.status(500).json({
      errCode: 1,
      message: "Dữ liệu không được bỏ trống! Vui lòng nhập đầy đủ ",
    });
  }
  let userData = await userService.handleUserLogin(email, pass_word);
  if (userData.errCode === 0) {
    const token = jwt.sign(
      {
        userId: userData.user.id,
        email: userData.user.email,
      },
      "your_secret_key_here"
    );
    return res.status(200).json({
      errCode: 0,
      message: "Đăng nhập thành công",
      token: token,
      userData: userData.user,
      userData,
    });
  } else {
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
    });
  }

};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
