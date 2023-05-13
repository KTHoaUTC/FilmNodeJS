import express from "express";
import homeController from '../controllers/homeController';

let router=express.Router();
let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/about',homeController.getAboutPage);

    // router.get('/crud',homeController.getCRUD);

    // router.post('/post-crub',homeController.postCRUD);

    // router.get('/get-crub',homeController.displayGetCRUD);

    // router.get('/edit-crub',homeController.getEditCRUD);

    // router.post('/put-crub',homeController.putCRUD);
    // router.get('/delete-crub',homeController.deleteCRUD);

    // router.post('/api/login',userController.handleLogin);

    // router.get('/api/getAllUser', userController.handleGetAllUsers);

    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.put('/api/edit-user', userController.handleEditUser);
    // router.delete('/api/delete-user', userController.handleDeleteUser);


    router.get('/fff',(req,res)=>{
        return res.send('Hello eorld whifd')
    });
    //rest api
    return app.use("/",router);
}
module.exports= initWebRoutes;