import movieService from "../services/movieService";

let handleGetAllMovies= async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong truyen id",
      movies: [],
    });
  }
  let movies = await movieService.getAllMovies(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    movies,
  });
};

let handleCreateNewMovie = async (req, res) => {
  let message = await movieService.createNewMovie(req.body);
  return res.status(200).json(message);
};
let handleDeleteMovie = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thieu tham  so id ",
    });
  }
  let message = await movieService.deleteMovie(req.body.id);
  return res.status(200).json(message);
};
let handleEditMovie = async (req, res) => {
  let data = req.body;
  let message = await movieService.updateMovie(data);
  return res.status(200).json(message);
};



module.exports = {
  handleGetAllMovies: handleGetAllMovies,
  handleCreateNewMovie: handleCreateNewMovie,
  handleDeleteMovie: handleDeleteMovie,
  handleEditMovie: handleEditMovie,
};

