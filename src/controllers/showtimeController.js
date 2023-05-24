import showTimeService from "../services/showTimeService";

let handleGetAllShowTimes = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      showtimes: [],
    });
  }
  let showtimes = await showTimeService.getAllShowTimes(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    showtimes,
  });
};

let handleCreateNewShowTime = async (req, res) => {
  let message = await showTimeService.createNewShowTime(req.body);
  return res.status(200).json(message);
};
let handleDeleteShowTime = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await showTimeService.deleteShowTime(req.body.id);
  return res.status(200).json(message);
};
let handleEditShowTime = async (req, res) => {
  let data = req.body;
  let message = await showTimeService.updateShowTime(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllShowTimes: handleGetAllShowTimes,
  handleCreateNewShowTime: handleCreateNewShowTime,
  handleDeleteShowTime: handleDeleteShowTime,
  handleEditShowTime: handleEditShowTime,
};
