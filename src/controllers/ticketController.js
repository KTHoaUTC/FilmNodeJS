import cmtService from "../services/cmtService";
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

let handleDeleteComment = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await cmtService.deleteComment(req.body.id);
  return res.status(200).json(message);
};
let handleEditComment = async (req, res) => {
  let data = req.body;
  let message = await cmtService.updateComment(data);
  return res.status(200).json(message);
};

module.exports = {
  handleAllTickets: handleAllTickets,
  handleAddTicket: handleAddTicket,
  
  handleDeleteComment: handleDeleteComment,
  handleEditComment: handleEditComment,
};
