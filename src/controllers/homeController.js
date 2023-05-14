// import { JSON } from 'sequelize/types';
import db from "../models/index";
import CRUDService from "../services/CRUDService";


let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud");
};
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
//   console.log('dddd',req.body);
  return res.send("tao thanh cong tai khoan");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
//   console.log( 'ddd',data);
    // return res.send("get all");

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId)
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    // console.log('uds',userData)
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found ");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  // return res.send('update done1');
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD =async(req, res)=>{
    let id= req.query.id;
    if(id){
         await CRUDService.deleteUserById(id);
    return res.send('delete success')
    
    }
    else{
        return res.send('delete fail')
    }
   
}
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD:displayGetCRUD,
  getEditCRUD:getEditCRUD,
  putCRUD:putCRUD,
  deleteCRUD:deleteCRUD
};
