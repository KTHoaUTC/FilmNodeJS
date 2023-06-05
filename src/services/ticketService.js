import db from "../models/index";

let getAllTickets = (ticketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tickets = "";
      if (ticketId === "ALL") {
        tickets = await db.Ticket.findAll({});
      }
      if (ticketId && ticketId !== "ALL") {
        tickets = await db.Ticket.findOne({
          where: { id: ticketId },
        });
      }
      resolve(tickets);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTicket = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Ticket.create({
        booking_id: data.booking_id,
        qrCode: data.qrCode,
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

// let deleteSeat = (seatId) => {
//   return new Promise(async (resolve, reject) => {
//     let foundSeat = await db.Seat.findOne({
//       where: { id: seatId },
//     });
//     if (!foundSeat) {
//       resolve({
//         errCode: 2,
//         errMessage: "the loai khong ton tai",
//       });
//     }
//     await db.Seat.destroy({
//       where: { id: seatId },
//     });
//     resolve({
//       errCode: 0,
//       errMessage: "Rddd da xoa",
//     });
//   });
// };
// let updateSeat = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.id) {
//         resolve({
//           errCode: 2,
//           errMessage: "loi chua  id",
//         });
//       }
//       let seat = await db.Seat.findOne({
//         where: { id: data.id },
//         raw: false,
//       });
//       if (seat) {
//         seat.seat_type_id = data.seat_type_id;
//         seat.phongchieu_id = data.phongchieu_id;
//         seat.row = data.row;
//         seat.status = data.status;

//         await seat.save();
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
  //   checkName: checkName,
  getAllTickets: getAllTickets,
  createNewTicket: createNewTicket,
  //   deleteSeat: deleteSeat,
  //   updateSeat: updateSeat,
};
