import db from "../models/index";

// let checkName = (genreName) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let genre = await db.Genres.findOne({
//         where: { name: genreName },
//       });
//       if (genre) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getAllShowTimes = (showTimeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let showtimes = "";
      if (showTimeId === "ALL") {
        showtimes = await db.ShowTime.findAll({});
      }
      if (showTimeId && showTimeId !== "ALL") {
        showtimes = await db.ShowTime.findOne({
          where: { id: showTimeId },
        });
      }

      resolve(showtimes);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewShowTime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check name co ton tai hay khong
      //   let check = await checkName(data.name);
      //   if (check === true) {
      //     resolve({
      //       errCode: 1,
      //       message: "The loai da ton tai, vui long nhap the loai khac",
      //     });
      //   } else {
      //     await db.Genres.create({
      //       name: data.name,
      //     });
      //     resolve({
      //       errCode: 0,
      //       message: "Ok",
      //     });
      //   }
      await db.ShowTime.create({
        movie_id: data.movie_id,
        theater_id: data.theater_id,
        phongchieu_id: data.phongchieu_id,
        ngay_chieu: data.ngay_chieu,
        gio_chieu: data.gio_chieu,
        money: data.money,
      });
      resolve({
        errCode: 0,
        message: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteShowTime = (showTimeId) => {
  return new Promise(async (resolve, reject) => {
    let foundShowTime = await db.ShowTime.findOne({
      where: { id: showTimeId },
    });
    if (!foundShowTime) {
      resolve({
        errCode: 2,
        errMessage: "tphong khong ton tai",
      });
    }
    await db.ShowTime.destroy({
      where: { id: showTimeId },
    });
    resolve({
      errCode: 0,
      errMessage: "phong da xoa",
    });
  });
};
let updateShowTime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua eee truyen id",
        });
      }
      let showtime = await db.ShowTime.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (showtime) {
        showtime.movie_id = data.movie_id;
        showtime.theater_id = data.theater_id;
        showtime.phongchieu_id = data.phongchieu_id;
        showtime.ngay_chieu = data.ngay_chieu;
        showtime.gio_chieu = data.gio_chieu;
        showtime.money = data.money;

        await showtime.save();
        resolve({
          errCode: 0,
          message: "Update phon thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "phong khong duoc tim thay!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  //   checkName: checkName,
  getAllShowTimes: getAllShowTimes,
  createNewShowTime: createNewShowTime,
  deleteShowTime: deleteShowTime,
  updateShowTime: updateShowTime,
};
