import db from "../models/index";

let checkName = (genreName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let genre = await db.SeatType.findOne({
        where: { name: genreName },
      });
      if (genre) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTypeSeats = (typeSeatId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeseats = "";
      if (typeSeatId === "ALL") {
        typeseats = await db.SeatType.findAll({});
      }
      if (typeSeatId && typeSeatId !== "ALL") {
        typeseats = await db.SeatType.findOne({
          where: { id: typeSeatId },
        });
      }

      resolve(typeseats);
    } catch (e) {
      reject(e);
    }
  });
};

// let createNewTypeSeat = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       //check name co ton tai hay khong
//       let check = await checkName(data.name);
//       if (check === true) {
//         resolve({
//           errCode: 1,
//           message: "The loai da ton tai, vui long nhap the loai khac",
//         });
//       } else {
//         await db.SeatType.create({
//           name: data.name,
//         });
//         resolve({
//           errCode: 0,
//           message: "Ok",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
// let deleteTypeSeat = (genreId) => {
//   return new Promise(async (resolve, reject) => {
//     let foundUser = await db.SeatType.findOne({
//       where: { id: genreId },
//     });
//     if (!foundUser) {
//       resolve({
//         errCode: 2,
//         errMessage: "the loai khong ton tai",
//       });
//     }
//     console.log("dfhsf", foundUser);
//     await db.SeatType.destroy({
//       where: { id: genreId },
//     });
//     resolve({
//       errCode: 0,
//       errMessage: "the loai da xoa",
//     });
//   });
// };
// let updateTypeSeat = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.id) {
//         resolve({
//           errCode: 2,
//           errMessage: "loi chua gggtruyen id",
//         });
//       }
//       let genre = await db.SeatType.findOne({
//         where: { id: data.id },
//         raw: false,
//       });
//       if (genre) {
//         genre.name = data.name;

//         await genre.save();
//         resolve({
//           errCode: 0,
//           message: "Update thanh cong!",
//         });
//       } else {
//         resolve({
//           errCode: 1,
//           errMessage: "the loai khong duoc tim thay!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  checkName: checkName,
  getAllTypeSeats: getAllTypeSeats,
//   createNewTypeSeat: createNewTypeSeat,
//   deleteTypeSeat: deleteTypeSeat,
//   updateTypeSeat: updateTypeSeat,
};
