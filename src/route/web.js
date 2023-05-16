import express from "express";
import homeController from '../controllers/homeController';
import userController from "../controllers/userController";
import genreController from "../controllers/genreController";

let router=express.Router();
let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/about',homeController.getAboutPage);

    router.get('/crud',homeController.getCRUD);

    router.post('/post-crud',homeController.postCRUD);

    router.get('/get-crud',homeController.displayGetCRUD);

    router.get('/edit-crud',homeController.getEditCRUD);

    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);

    router.post("/gateway/api/v1/login", userController.handleLogin);

    router.get("/gateway/api/v1/get-all-users", userController.handleGetAllUsers);

    router.post(
      "/gateway/api/v1/create-user",
      userController.handleCreateNewUser
    );
    router.put("/gateway/api/v1/edit-user", userController.handleEditUser);
    router.delete(
      "/gateway/api/v1/delete-user",
      userController.handleDeleteUser
    );


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

    router.get('/fff',(req,res)=>{
        return res.send('Hello eorld whifd')
    });
    //rest api
    return app.use("/",router);
}
module.exports= initWebRoutes;