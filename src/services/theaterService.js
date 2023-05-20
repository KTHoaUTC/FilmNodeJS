import db from "../models/index";

let checkName = (theaterName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let theater = await db.Theater.findOne({
        where: { name: theaterName },
      });
      if (theater) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTheaters = (theaterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let theaters = "";
      if (theaterId === "ALL") {
        theaters= await db.Theater.findAll({})
      }
      if (theaterId && theaterId !== "ALL") {
        theaters = await db.Theater.findOne({
          where: { id: theaterId },
        });
      }
      resolve(theaters);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTheater = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check name co ton tai hay khong
      let check = await checkName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Rap da ton tai, vui long nhap Rap khac",
        });
      } else {
        await db.Theater.create({
          name: data.name,
          address: data.address,
          description: data.description,
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
let deleteTheater = (theaterId) => {
  return new Promise(async (resolve, reject) => {
    let foundTheater = await db.Theater.findOne({
      where: { id: theaterId },
    });
    if (!foundTheater) {
      resolve({
        errCode: 2,
        errMessage: "Rap khong ton tai",
      });
    }
    console.log("dfhsf", foundTheater);
    await db.Theater.destroy({
      where: { id: theaterId },
    });
    resolve({
      errCode: 0,
      errMessage: "Rap da xoa",
    });
  });
};
let updateTheater = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua truyen id rap",
        });
      }
      let theater = await db.Theater.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (theater) {
        theater.name = data.name;
        theater.address = data.address;
        theater.description = data.description;
        theater.image = data.image;

        await theater.save();
        resolve({
          errCode: 0,
          message: "Update thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Phim khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  checkName: checkName,
  getAllTheaters: getAllTheaters,
  createNewTheater: createNewTheater,
  deleteTheater: deleteTheater,
  updateTheater: updateTheater,
};
