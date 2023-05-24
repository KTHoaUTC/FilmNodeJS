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
  try {
    let userData = await userService.handleUserLogin(email, pass_word);
    if (userData.errCode === 0) {
      const token = jwt.sign(
        {
          userId: userData.user.id,
          email: userData.user.email,
        },
        "your_secret_key_here"
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).json({
        errCode: 0,
        message: "Đăng nhập thành công",
        token: token,
        userData: userData.user,
        // userData,
      });
    } else {
      return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
      });
    }
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: "Đã xảy ra lỗi trong quá trình xử lý",
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

let handleGetAllAuths = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      users: [],
    });
  }
  let users = await userService.getAllAuths(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

//auth
let handleDangKi = async (req, res) => {
  let message = await userService.createNewAuth(req.body);
  return res.status(200).json(message);
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

let handleAllBookings = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      bookings: [],
    });
  }
  let bookings = await userService.getAllBookings(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    bookings,
  });
};

let handleBooking = async (req, res) => {
  let message = await userService.createBooking(req.body);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllAuths: handleGetAllAuths,
  handleDangKi: handleDangKi,
  handleAllBookings: handleAllBookings,
  handleBooking: handleBooking,
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
