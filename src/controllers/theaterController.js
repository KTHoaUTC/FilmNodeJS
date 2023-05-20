import theaterService from "../services/theaterService";

let handleGetAllTheaters = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      theaters: [],
    });
  }
  let theaters = await theaterService.getAllTheaters(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    theaters,
  });
};

let handleCreateNewTheater = async (req, res) => {
  let message = await theaterService.createNewTheater(req.body);
  return res.status(200).json(message);
};
let handleDeleteTheater = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await theaterService.deleteTheater(req.body.id);
  return res.status(200).json(message);
};
let handleEditTheater = async (req, res) => {
  let data = req.body;
  let message = await theaterService.updateTheater(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllTheaters: handleGetAllTheaters,
  handleCreateNewTheater: handleCreateNewTheater,
  handleDeleteTheater: handleDeleteTheater,
  handleEditTheater: handleEditTheater,
};
