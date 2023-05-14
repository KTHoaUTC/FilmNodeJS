import db from '../models/index';
import bcrypt from 'bcryptjs';

// const salt = bcrypt.genSaltSync(10);

// let hasUserPassword =(pass_word)=>{
//     return new Promise(async(resolve, reject)=>{
//         try{
//             let hashPassword = await bcrypt.hashSync(pass_word, salt);
//             resolve(hashPassword);

//         }
//         catch(e){
//             reject(e);
//         }
//      })
// }

let handleUserLogin =(email , pass_word)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let userData={};

            let isExist = await checkUserEmail(email);
            if(isExist){
                let user= await db.User.findOne({
                    where:{email: email},
                    attributes:['email','RoleId','pass_word'],
                    raw:true 
                  
                });
                if(user){
                    let check= await bcrypt.compare(pass_word,user.pass_word);
                    

                    if(check){
                        userData.errCode=0;
                        userData.errMessage='Đăng nhập thành công';

                        delete user.pass_word;
                        userData.user=user;
                    }else{
                        userData.errCode=3;
                        userData.errMessage='Sai mật khẩu. Vui lòng nhập lại!';
                    }
                }else{
                    userData.errCode=2;
                    userData.errMessage='Người dùng không tồn tại!';
                }
                //ton tai ng dung
             //   resolve()
            }else{
                
                userData.errCode=1;
                userData.errMessage ='Email không tồn tại. Vui lòng nhập lại!'
                
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
    })
}


let checkUserEmail =(userEmail)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let user= await db.User.findOne({
                where:{email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }

        }catch(e){
            reject(e);
        }
    })
}

// let getAllUsers=(userId)=>{
//     return new Promise(async(resolve,reject)=>{
//         try{
//             let users='';
//             if(userId==='ALL'){
//                 users=await db.User.findAll({
//                     attributes:{
//                         exclude:['password']
//                     }

//                 })
//             }
//             if(userId && userId !=='ALL'){
//                 users=await db.User.findOne({
//                     where:{id:userId},
//                     attributes:{
//                         exclude:['password']
//                     }
//                 })
//             }
          
//             resolve(users)

//         }catch(e){
//             reject(e)
//         }

//     })

// }
// let createNewUser = (data)=>{
//     return new Promise(async(resolve,reject)=>{
//         try{
//             //check email co ton tai hay khong
//             let check= await checkUserEmail(data.email);
//             if(check===true){
//                 resolve({
//                     errCode:1,
//                     message:'Email da ton tai, vui long nhap email khac'
//                 })
//             }

//             let hashPasswordFromBcrypt= await hasUserPassword(data.password);
//             await db.User.create({
//                 firstName: data.firstname,
//                 lastName: data.lastname,
//                 gender: data.gender==='1'? true: false,
//                 email: data.email,
//                 address: data.address,
//                 phone: data.phonenumber,
//                 password:hashPasswordFromBcrypt,
//                 roleid:data.roleid,
//             })
//             resolve({
//                 errCode:0,
//                 message:'Ok'
//             })

//         }catch(e){
//             reject(e)
//         }
//     })
   
// }
// let deleteUser = (userId) => {
//     return new Promise(async(resolve,reject)=>{
//         let foundUser= await db.User.findOne({
//             where: {id:userId }
//         })
//         if(!foundUser){
//             resolve({
//                 errCode:2,
//                 errMessage:'nguoi dung khong ton tai'
//             })
//         }
//         console.log('dfhsf',foundUser)       
//         await db.User.destroy({
//                 where: { id: userId}
//         })
//         resolve({
//             errCode:0,
//             errMessage:'Nguoi dung da xoa'
//         })
//     })
// }
// let updateUserData=(data)=>{
//     return new Promise(async(resolve,reject)=>{
//         try{
//             if(!data.id){
//                 resolve({
//                     errCode:2,
//                     errMessage:'loi chua truyen id'
//                 })
//             }
//             let user=await db.User.findOne({
//                 where: {id:data.id},
//                 raw: false
//             })
//             if(user){
//                 user.firstName=data.firstName;
//                 user.lastName=data.lastName;
//                 user.phone=data.phone;
//                 user.address=data.address;
//                 user.gender=data.gender;

//                 await user.save();
//                 // user.password=hashPasswordFromBcrypt();
//                 // await db.User.save({
//                 //     firstName: data.firstName,
//                 //     lastName:data.lastName,
//                 //     phone:data.phone,
//                 //     address:data.address,
//                 //     gender:data.gender,
//                 // })
//                 resolve({
//                     errCode:0,
//                     message:'Update thanh cong!'
//                 })
                
//               //  let allUsers = await db.User.findAll()
//                 //resolve(allUsers);
//             }else{
//                 resolve({
//                     errCode:1,
//                     errMessage:'nguoi dung khong duoc tim thay!'
//                 })
//             }

//         }catch(e){
//             reject(e)
//         }
//     })

// }

module.exports={
    // hasUserPassword: hasUserPassword,
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    // getAllUsers:getAllUsers,
    // createNewUser:createNewUser,
    // deleteUser:deleteUser,
    // updateUserData:updateUserData
   
}