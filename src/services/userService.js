import db from "../models/index";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);

let hasUserPassword = (pass_word) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(pass_word, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, pass_word) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "id", "RoleId", "pass_word"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(pass_word, user.pass_word);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Đăng nhập thành công";
            delete user.pass_word;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Sai mật khẩu. Vui lòng nhập lại!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Người dùng không tồn tại!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email không tồn tại. Vui lòng nhập lại!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["pass_word"],
          },
          where: {
            roleId: {
              [Op.not]: null,
            },
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: {
            id: userId,
            roleId: {
              [Op.not]: null,
            },
          },
          attributes: {
            exclude: ["pass_word"],
          },
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email da ton tai, vui long nhap email khac",
        });
      } else {
        let hashPasswordFromBcrypt = await hasUserPassword(data.pass_word);
        await db.User.create({
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender === "1" ? true : 0,
          email: data.email,
          address: data.address,
          phone_number: data.phone_number,
          pass_word: hashPasswordFromBcrypt,
          RoleId: data.RoleId,
          image: data.image,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//auth

let getAllAuths = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["pass_word"],
          },
          where: {
            RoleId: null,
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: {
            id: userId,
            RoleId: null,
          },
          attributes: {
            exclude: ["pass_word"],
          },
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewAuth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email co ton tai hay khong
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email da ton tai, vui long nhap email khac",
        });
      } else {
        let hashPasswordFromBcrypt = await hasUserPassword(data.pass_word);
        await db.User.create({
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender === "1" ? true : 0,
          email: data.email,
          address: data.address,
          phone_number: data.phone_number,
          pass_word: hashPasswordFromBcrypt,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "nguoi dung khong ton tai",
      });
    }
    console.log("dfhsf", foundUser);
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "Nguoi dung da xoa",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua truyen id",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.phone_number = data.phone_number;
        user.address = data.address;
        user.gender = data.gender;
        user.image = data.image;
        user.pass_word = data.pass_word;
        await user.save();
        resolve({
          errCode: 0,
          message: "Update thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "nguoi dung khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllBookings = (bookingId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookings = "";
      if (bookingId === "ALL") {
        bookings = await db.Booking.findAll({});
      }
      if (bookingId && bookingId !== "ALL") {
        bookings = await db.Booking.findOne({
          where: { id: bookingId },
        });
      }

      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
let createBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdBooking = await db.Booking.create({
        movie_id: data.movie_id,
        user_id: data.user_id,
        theater_id: data.theater_id,
        show_time_id: data.show_time_id,
        seat_id: data.seat_id,
        booking_status: data.booking_status,
        total_price: data.total_price,
        payment_status: data.payment_status,
      });
      
      resolve({
        errCode: 0,
        message: "Ok",
        bookings: {
          id: createdBooking.id, // Include the ID of the created booking in the response
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua truyen id",
        });
      }
      let booking = await db.Booking.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (booking) {
        booking.QRCode = data.QRCode;

        await booking.save();
        resolve({
          errCode: 0,
          message: "Update QR thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "nguoi dung khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  updateBooking:updateBooking,
  getAllAuths:getAllAuths,
  createNewAuth:createNewAuth,
  createBooking: createBooking,
  getAllBookings: getAllBookings,
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
};
