import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import genreController from "../controllers/genreController";
import movieController from "../controllers/movieController";
import theaterController from "../controllers/theaterController";
import typeSeatController from "../controllers/typeSeatController";
import seatController from "../controllers/seatController";
import phongchieuController from "../controllers/phongchieuController";
import showtimeController from "../controllers/showtimeController";
import db from "../models/index";
const { Op } = require("sequelize");

// const Movie = require("../models/movies");

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);

  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);

  router.get("/get-crud", homeController.displayGetCRUD);

  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);

  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/gateway/api/v1/login", userController.handleLogin);

  router.get("/gateway/api/v1/get-all-users", userController.handleGetAllUsers);

  router.post(
    "/gateway/api/v1/create-user",
    userController.handleCreateNewUser
  );

  router.put("/gateway/api/v1/edit-user", userController.handleEditUser);
  router.delete("/gateway/api/v1/delete-user", userController.handleDeleteUser);

  //dang ki user
  router.get("/gateway/api/v1/get-all-auths", userController.handleGetAllAuths);

  router.post("/gateway/api/v1/dangki", userController.handleDangKi);

  //the loai phim
  router.get(
    "/gateway/api/v1/get-all-genres",
    genreController.handleGetAllGenres
  );

  router.post(
    "/gateway/api/v1/create-genre",
    genreController.handleCreateNewGenre
  );
  router.put("/gateway/api/v1/edit-genre", genreController.handleEditGenre);
  router.delete(
    "/gateway/api/v1/delete-genre",
    genreController.handleDeleteGenre
  );

  //phim
  router.get(
    "/gateway/api/v1/get-all-movies",
    movieController.handleGetAllMovies
  );

  router.post(
    "/gateway/api/v1/create-movie",
    movieController.handleCreateNewMovie
  );
  router.put("/gateway/api/v1/edit-movie", movieController.handleEditMovie);

  router.delete(
    "/gateway/api/v1/delete-movie",
    movieController.handleDeleteMovie
  );
  ///

  //Rap

  router.get(
    "/gateway/api/v1/get-all-theaters",
    theaterController.handleGetAllTheaters
  );

  router.post(
    "/gateway/api/v1/create-theater",
    theaterController.handleCreateNewTheater
  );

  router.put(
    "/gateway/api/v1/edit-theater",
    theaterController.handleEditTheater
  );

  router.delete(
    "/gateway/api/v1/delete-theater",
    theaterController.handleDeleteTheater
  );

  // ghe va loai ghe

  //loaighe
  router.get(
    "/gateway/api/v1/get-all-typeseats",
    typeSeatController.handleGetAllTypeSeats
  );

  //
  // //ghe
  router.get("/gateway/api/v1/get-all-seats", seatController.handleGetAllSeats);

  router.post(
    "/gateway/api/v1/create-seat",
    seatController.handleCreateNewSeat
  );

  router.put("/gateway/api/v1/edit-seat", seatController.handleEditSeat);

  router.delete("/gateway/api/v1/delete-seat", seatController.handleDeleteSeat);
  // ///

  //phongchieu

  router.get(
    "/gateway/api/v1/get-all-phongchieus",
    phongchieuController.handleGetAllPhongChieus
  );

  router.post(
    "/gateway/api/v1/create-phongchieu",
    phongchieuController.handleCreateNewPhongChieu
  );

  router.put(
    "/gateway/api/v1/edit-phongchieu",
    phongchieuController.handleEditPhongChieu
  );

  router.delete(
    "/gateway/api/v1/delete-phongchieu",
    phongchieuController.handleDeletePhongChieu
  );

  /// lich chieu

  router.get(
    "/gateway/api/v1/get-all-showtimes",
    showtimeController.handleGetAllShowTimes
  );

  router.post(
    "/gateway/api/v1/create-showtime",
    showtimeController.handleCreateNewShowTime
  );

  router.put(
    "/gateway/api/v1/edit-showtime",
    showtimeController.handleEditShowTime
  );

  router.delete(
    "/gateway/api/v1/delete-showtime",
    showtimeController.handleDeleteShowTime
  );

  ///
  //booking
  router.get(
    "/gateway/api/v1/get-all-bookings",
    userController.handleAllBookings
  );

  router.post("/gateway/api/v1/booking", userController.handleBooking);

  router.get("/gateway/api/v1/searcher", async (req, res) => {
    try {
      const { key } = req.query;
      const movies = await db.Movies.findAll({
        where: {
          title: {
            [Op.like]: `%${key}%`,
          },
        },
      });

      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/fff", (req, res) => {
    return res.send("Hello eorld whifd");
  });
  //rest api
  return app.use("/", router);
};
module.exports = initWebRoutes;
