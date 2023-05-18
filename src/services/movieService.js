import db from "../models/index";

let checkTitle = (movieTitle) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await db.Movies.findOne({
        where: { title: movieTitle },
      });
      if (movie) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllMovies = (movieId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movies = "";
      if (movieId === "ALL") {
        movies = await db.Movies.findAll({});
      }
      if (movieId && movieId !== "ALL") {
        movies = await db.Movies.findOne({
          where: { id: movieId },
        });
      }

      resolve(movies);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check name co ton tai hay khong
      let check = await checkTitle(data.title);
      if (check === true) {
        resolve({
          errCode: 1,
          message: " Phim da ton tai, vui long nhap phim khac",
        });
      } else {
        await db.Movies.create({
          title: data.title,
          genres_id: data.genres_id,
          description: data.description,
          countries: data.countries,
          poster_url: data.poster_url,
          trailer_url: data.trailer_url,
          image_url: data.image_url,
          release_date: data.release_date,
          run_time: data.run_time,
          director: data.director,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteMovie = (movieId) => {
  return new Promise(async (resolve, reject) => {
    let foundMovie = await db.Movies.findOne({
      where: { id: movieId },
    });
    if (!foundMovie) {
      resolve({
        errCode: 2,
        errMessage: "Phim khong ton tai",
      });
    }
    console.log("dfhsf", foundMovie);
    await db.Movies.destroy({
      where: { id: movieId },
    });
    resolve({
      errCode: 0,
      errMessage: "Phim da xoa",
    });
  });
};
let updateMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua gggtruyen id",
        });
      }
      let movie = await db.Movies.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (movie) {
        movie.title = data.title;
        movie.genres_id = data.genres_id;
        movie.description = data.description;
        movie.countries = data.countries;
        movie.poster_url = data.poster_url;
        movie.trailer_url = data.trailer_url;
        movie.image_url = data.image_url;
        movie.release_date = data.release_date;
        movie.run_time = data.run_time;
        movie.director = data.director;

        await movie.save();
        resolve({
          errCode: 0,
          message: "Update movie thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Phim khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllMovies: getAllMovies,
  createNewMovie: createNewMovie,
  deleteMovie: deleteMovie,
  updateMovie: updateMovie,
};
