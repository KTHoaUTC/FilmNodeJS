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

let getAllPhongChieus = (phongChieuId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let phongchieus = "";
      if (phongChieuId === "ALL") {
        phongchieus = await db.PhongChieu.findAll({});
      }
      if (phongChieuId && phongChieuId !== "ALL") {
        phongchieus = await db.PhongChieu.findOne({
          where: { id: phongChieuId },
        });
      }

      resolve(phongchieus);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewPhongChieu = (data) => {
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
      await db.PhongChieu.create({
        name: data.name,
        theater_id: data.theater_id,
        seat_id: data.seat_id,
        sum_seat: data.sum_seat,
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
let deletePhongChieu = (phongChieuId) => {
  return new Promise(async (resolve, reject) => {
    let foundPhongChieu = await db.PhongChieu.findOne({
      where: { id: phongChieuId },
    });
    if (!foundPhongChieu) {
      resolve({
        errCode: 2,
        errMessage: "tphong khong ton tai",
      });
    }
    await db.PhongChieu.destroy({
      where: { id: phongChieuId },
    });
    resolve({
      errCode: 0,
      errMessage: "phong da xoa",
    });
  });
};
let updatePhongChieu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "loi chua gggtruyen id",
        });
      }
      let phongchieu = await db.PhongChieu.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (phongchieu) {
        phongchieu.name = data.name;
        phongchieu.theater_id = data.theater_id;
        phongchieu.seat_id = data.seat_id;
        phongchieu.sum_seat = data.sum_seat;

        await phongchieu.save();
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
  getAllPhongChieus: getAllPhongChieus,
  createNewPhongChieu: createNewPhongChieu,
  deletePhongChieu: deletePhongChieu,
  updatePhongChieu: updatePhongChieu,
};
