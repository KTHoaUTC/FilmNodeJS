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
module.exports = {
  getAllTickets: getAllTickets,
  createNewTicket: createNewTicket,
};




