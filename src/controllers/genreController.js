import genreService from "../services/genreService";

let handleGetAllGenres = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      genres: [],
    });
  }
  let genres = await genreService.getAllGenres(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    genres,
  });
};


let handleCreateNewGenre = async (req, res) => {
  let message = await genreService.createNewGenre(req.body);
  return res.status(200).json(message);
};
let handleDeleteGenre = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await genreService.deleteGenre(req.body.id);
  return res.status(200).json(message);
};
let handleEditGenre = async (req, res) => {
  let data = req.body;
  let message = await genreService.updateGenre(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllGenres: handleGetAllGenres,
  handleCreateNewGenre: handleCreateNewGenre,
  handleEditGenre: handleEditGenre,
  handleDeleteGenre: handleDeleteGenre,
};
