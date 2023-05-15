import userService from '../services/userService'

let handleLogin = async(req, res)=>{
    let email= req.body.email;
    let pass_word= req.body.pass_word;
    // check email cua nguoi dung co ton tai hay khong
    if( !email || !pass_word){
        return res.status(500).json({
            errCode:1,
            message:'Dữ liệu không được bỏ trống! Vui lòng nhập đầy đủ '
        })
    }
    let userData= await userService.handleUserLogin(email,pass_word);
    //so sanh password cua nguoi dung

    // return userInfor

    //access token JWT
    return res.status(200).json({
    //    user: userData.user?userData.user:{},
       errCode:userData.errCode,
       message:userData.errMessage,
    userData
        // errCode:0,
        // message:'hello world',
        // yourEmail: email,
        // test:"test"
       
    })
}
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if(!id){
      return res.status(200).json({
          errCode:1,
          errMessage:'Loi khong truyen id',
          users:[],
      })
  }
  let users = await userService.getAllUsers(id);
  //    console.log(users)
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
let handleCreateNewUser= async(req,res)=>{
    let message=await userService.createNewUser(req.body);
    return res.status(200).json(message);

}
let handleDeleteUser =async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage:'thieu tham  so id '
        })
    }
    let message=await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let handleEditUser= async(req,res)=>{
    let data= req.body;
    let message= await userService.updateUserData(data);
    // return res.send('update done1');    
    return res.status(200).json(message)
    

}


module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser:handleCreateNewUser,
  handleEditUser:handleEditUser,
  handleDeleteUser:handleDeleteUser,
};