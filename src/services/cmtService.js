import db from "../models/index";

let getAllComments = (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comments = "";
      if (commentId === "ALL") {
        comments = await db.Comment.findAll({});
      }
      if (commentId && commentId !== "ALL") {
        comments = await db.Comment.findOne({
          where: { id: commentId },
        });
      }

      resolve(comments);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.create({
        movie_id: data.movie_id,
        user_id: data.user_id,
        comment_text: data.comment_text,
      });
      const comments = await db.Comment.findAll({
        where: { movie_id: data.movie_id },
        order: [["createdAt", "DESC"]],
      });

      // Thêm bình luận mới vào đầu mảng comments
      comments.unshift({
        movie_id: data.movie_id,
        user_id: data.user_id,
        comment_text: data.comment_text,
        createdAt: new Date(),
      });
      resolve({
        errCode: 0,
        message: "Ok",
        comments: comments,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// let deleteSeat = (seatId) => {
//   return new Promise(async (resolve, reject) => {
//     let foundSeat = await db.Seat.findOne({
//       where: { id: seatId },
//     });
//     if (!foundSeat) {
//       resolve({
//         errCode: 2,
//         errMessage: "the loai khong ton tai",
//       });
//     }
//     await db.Seat.destroy({
//       where: { id: seatId },
//     });
//     resolve({
//       errCode: 0,
//       errMessage: "Rddd da xoa",
//     });
//   });
// };
// let updateSeat = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.id) {
//         resolve({
//           errCode: 2,
//           errMessage: "loi chua  id",
//         });
//       }
//       let seat = await db.Seat.findOne({
//         where: { id: data.id },
//         raw: false,
//       });
//       if (seat) {
//         seat.seat_type_id = data.seat_type_id;
//         seat.phongchieu_id = data.phongchieu_id;
//         seat.row = data.row;
//         seat.status = data.status;

//         await seat.save();
//         resolve({
//           errCode: 0,
//           message: "Update thanh cong!",
//         });
//       } else {
//         resolve({
//           errCode: 1,
//           errMessage: "the loai khong duoc tim thay!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  //   checkName: checkName,
  getAllComments: getAllComments,
  createNewComment: createNewComment,
  //   deleteSeat: deleteSeat,
  //   updateSeat: updateSeat,
};
