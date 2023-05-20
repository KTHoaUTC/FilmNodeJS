import db from "../models/index";

// let checkName = (genreName) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let genre = await db.Seat.findOne({
//         where: { name: genreName },
//       });
//       if (genre) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getAllSeats = (seatId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seats = "";
      if (seatId === "ALL") {
        seats = await db.Seat.findAll({});
      }
      if (seatId && seatId !== "ALL") {
        seats = await db.Seat.findOne({
          where: { id: seatId },
        });
      }

      resolve(seats);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewSeat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   check name co ton tai hay khong
      //   let check = await checkName(data.name);
      //   if (check === true) {
      //     resolve({
      //       errCode: 1,
      //       message: "The da ton tai, vui long nhap the loai khac",
      //     });
      //   } else {
      //     await db.Seat.create({
      //       phongchieu_id: data.phongchieu_id,
      //       seat_type_id: data.seat_type_id,
      //       row: data.row,
      //       status: data.status,
      //     });
      //     resolve({
      //       errCode: 0,
      //       message: "Ok",
      //     });
      //   }
      await db.Seat.create({
        phongchieu_id: data.phongchieu_id,
        seat_type_id: data.seat_type_id,
        row: data.row,
        status: data.status,
      });
      resolve({
        errCode: 0,
        message: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteSeat = (seatId) => {
  return new Promise(async (resolve, reject) => {
    let foundSeat = await db.Seat.findOne({
      where: { id: seatId },
    });
    if (!foundSeat) {
      resolve({
        errCode: 2,
        errMessage: "the loai khong ton tai",
      });
    }
    await db.Seat.destroy({
      where: { id: seatId },
    });
    resolve({
      errCode: 0,
      errMessage: "Rddd da xoa",
    });
  });
};
let updateSeat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua  id",
        });
      }
      let seat = await db.Seat.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (seat) {
        seat.seat_type_id = data.seat_type_id;
        seat.phongchieu_id = data.phongchieu_id;
        seat.row = data.row;
        seat.status = data.status;

        await seat.save();
        resolve({
          errCode: 0,
          message: "Update thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "the loai khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  //   checkName: checkName,
  getAllSeats: getAllSeats,
  createNewSeat: createNewSeat,
  deleteSeat: deleteSeat,
  updateSeat: updateSeat,
};
