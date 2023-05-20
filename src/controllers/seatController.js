import seatService from "../services/seatService";

let handleGetAllSeats = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      seats: [],
    });
  }
  let seats = await seatService.getAllSeats(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    seats,
  });
};

let handleCreateNewSeat = async (req, res) => {
  let message = await seatService.createNewSeat(req.body);
  return res.status(200).json(message);
};
let handleDeleteSeat = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await seatService.deleteSeat(req.body.id);
  return res.status(200).json(message);
};
let handleEditSeat = async (req, res) => {
  let data = req.body;
  let message = await seatService.updateSeat(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllSeats: handleGetAllSeats,
  handleCreateNewSeat: handleCreateNewSeat,
  handleDeleteSeat: handleDeleteSeat,
  handleEditSeat: handleEditSeat,
};
