import bcrypt from "bcrypt";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let hashPasswordFromBcrypt = await hasUserPassword(data.pass_word);
        await db.User.create({
          email: data.email,
          pass_word: hashPasswordFromBcrypt,
          first_name: data.first_name,
          last_name: data.last_name, 
          address:data.address,
          phone_number: data.phone_number ,
          gender: data.gender === "1" ? true : false,
          RoleId: data.RoleId,
          image: data.image
     
        });
        resolve("ok create");
      } catch (e) {
        reject(e);
      }
    });
};

//ma hoa mat khau khi nguoi dung nhap vao o input
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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};


let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.phone_number = data.phone_number;
        user.address = data.address;
        user.gender = data.gender;

        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};
