import typeSeatService from "../services/typeSeatService";

let handleGetAllTypeSeats = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      typeseats: [],
    });
  }
  let typeseats = await typeSeatService.getAllTypeSeats(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    typeseats,
  });
};

// let handleCreateNewTypeSeat = async (req, res) => {
//   let message = await typeSeatService.createNewTypeSeat(req.body);
//   return res.status(200).json(message);
// };
// let handleDeleteTypeSeat = async (req, res) => {
//   if (!req.body.id) {
//     return res.status(200).json({
//       errCode: 1,
//       errMessage: "thieu tham  so id ",
//     });
//   }
//   let message = await typeSeatService.deleteTypeSeat(req.body.id);
//   return res.status(200).json(message);
// };
// let handleEditTypeSeat = async (req, res) => {
//   let data = req.body;
//   let message = await typeSeatService.updateTypeSeat(data);
//   return res.status(200).json(message);
// };

module.exports = {
  handleGetAllTypeSeats: handleGetAllTypeSeats,
//   handleCreateNewTypeSeat: handleCreateNewTypeSeat,
//   handleDeleteTypeSeat: handleDeleteTypeSeat,
//   handleEditTypeSeat: handleEditTypeSeat,
};
