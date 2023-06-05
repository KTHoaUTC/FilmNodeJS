import cmtService from "../services/cmtService";

let handleAllComments = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      comments: [],
    });
  }
  let comments = await cmtService.getAllComments(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    comments,
  });
};

let handleAddComment = async (req, res) => {
  let message = await cmtService.createNewComment(req.body);
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
  handleAllComments: handleAllComments,
  handleAddComment: handleAddComment,
  handleDeleteComment: handleDeleteComment,
  handleEditComment: handleEditComment,
};
