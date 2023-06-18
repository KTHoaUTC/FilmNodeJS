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
import cmtController from "../controllers/cmtController";
import ticketController from "../controllers/ticketController";
import paymentController  from "../controllers/paymentController";

import db from "../models/index";
const { Op } = require("sequelize");

let router = express.Router();
let initWebRoutes = (app) => {
  router.post(
    "/gateway/api/v1/create-payment",
    paymentController.createPayment
  );

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
  router.put("/gateway/api/v1/edit-image", movieController.handleEditImage);

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
  router.put("/gateway/api/v1/edit-booking", userController.handleEditBooking);

  //history

  router.get("/gateway/api/v1/bookings/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
      const bookings = await db.Booking.findAll({
        where: { user_id: Number(user_id) },
      });

      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //search

  router.get("/gateway/api/v1/searcher", async (req, res) => {
    try {
      const { key } = req.query;
      const movies = await db.Movies.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${key}%`,
              },
            },
            {
              director: {
                [Op.like]: `%${key}%`,
              },
            },
          ],
        },
      });

      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  //searchShowTime
  router.get("/gateway/api/v1/searcherDate", async (req, res) => {
    try {
      const { key, startDate, endDate } = req.query;
      const showtimes = await db.ShowTime.findAll({
        where: {
          ngay_chieu: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      });

      res.json(showtimes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //comment

  //ticket
  router.get(
    "/gateway/api/v1/get-all-tickets",
    ticketController.handleAllTickets
  );
  router.post("/gateway/api/v1/add-ticket", ticketController.handleAddTicket);

  //booking
  router.get(
    "/gateway/api/v1/get-all-comments",
    cmtController.handleAllComments
  );

  router.get("/gateway/api/v1/comment/:movie_id", async (req, res) => {
    const { movie_id } = req.params;

    try {
      const comments = await db.Comment.findAll({
        where: { movie_id: Number(movie_id) },
      });

      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/gateway/api/v1/add-comment", cmtController.handleAddComment);
  router.put("/gateway/api/v1/edit-comment", cmtController.handleEditComment);
  router.delete(
    "/gateway/api/v1/delete-comment",
    cmtController.handleDeleteComment
  );

  router.get("/fff", (req, res) => {
    return res.send("Hello eorld whifd");
  });
  //rest api
  return app.use("/", router);
};
module.exports = initWebRoutes;
