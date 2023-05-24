import phongChieuService from "../services/phongChieuService";

let handleGetAllPhongChieus = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      phongchieus: [],
    });
  }
  let phongchieus = await phongChieuService.getAllPhongChieus(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    phongchieus,
  });
};

let handleCreateNewPhongChieu = async (req, res) => {
  let message = await phongChieuService.createNewPhongChieu(req.body);
  return res.status(200).json(message);
};
let handleDeletePhongChieu = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await phongChieuService.deletePhongChieu(req.body.id);
  return res.status(200).json(message);
};
let handleEditPhongChieu = async (req, res) => {
  let data = req.body;
  let message = await phongChieuService.updatePhongChieu(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllPhongChieus: handleGetAllPhongChieus,
  handleCreateNewPhongChieu: handleCreateNewPhongChieu,
  handleDeletePhongChieu: handleDeletePhongChieu,
  handleEditPhongChieu: handleEditPhongChieu,
};
