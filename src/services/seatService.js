import db from "../models/index";

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
      const { showtime_id, row } = data;

      // Kiểm tra trạng thái của ghế
      const seat = await db.Seat.findOne({
        where: { showtime_id, row },
      });

      if (seat && seat.status === 0) {
        // Ghế đã bán
        resolve({
          errCode: 1,
          message: "Ghế đã được bán. Không thể thêm vào cơ sở dữ liệu.",
        });
      } else {
        // Ghế chưa bán, thêm vào cơ sở dữ liệu
        const newSeat = await db.Seat.create({
          showtime_id,
          row,
          status: data.status,
        });

        resolve({
          errCode: 0,
          message: "Ghế đã được tạo thành công.",
          seat: newSeat.id,
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo ghế mới:", error);
      reject({ errCode: 500, message: "Lỗi khi tạo ghế mới." });
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
