import ticketService from "../services/ticketService";

let handleAllTickets = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      tickets: [],
    });
  }
  let tickets = await ticketService.getAllTickets(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    tickets,
  });
};

let handleAddTicket = async (req, res) => {
  let message = await ticketService.createNewTicket(req.body);
  return res.status(200).json(message);
};



module.exports = {
  handleAllTickets: handleAllTickets,
  handleAddTicket: handleAddTicket,

};
