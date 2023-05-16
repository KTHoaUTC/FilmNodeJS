import db from "../models/index";

let checkName = (genreName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let genre = await db.Genres.findOne({
        where: { name: genreName },
      });
      if (genre) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllGenres = (genreId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let geners = "";
      if (genreId === "ALL") {
        geners = await db.Genres.findAll({});
      }
      if (genreId && genreId !== "ALL") {
        geners = await db.Genres.findOne({
          where: { id: genreId },
        });
      }

      resolve(geners);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewGenre = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check name co ton tai hay khong
      let check = await checkName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "The loai da ton tai, vui long nhap the loai khac",
        });
      } else {
        await db.Genres.create({
          name: data.name,
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
let deleteGenre = (genreId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.Genres.findOne({
      where: { id: genreId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "the loai khong ton tai",
      });
    }
    console.log("dfhsf", foundUser);
    await db.Genres.destroy({
      where: { id: genreId },
    });
    resolve({
      errCode: 0,
      errMessage: "the loai da xoa",
    });
  });
};
let updateGenre = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua gggtruyen id",
        });
      }
      let genre = await db.Genres.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (genre) {
        genre.name = data.name;

        await genre.save();
        resolve({
          errCode: 0,
          message: "Update thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "the loai khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  checkName: checkName,
  getAllGenres: getAllGenres,
  createNewGenre: createNewGenre,
  deleteGenre: deleteGenre,
  updateGenre: updateGenre,
};
