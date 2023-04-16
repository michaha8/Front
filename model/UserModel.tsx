import FormData from "form-data";
import AuthApi from "../api/AuthApi";
import apiClient from "../api/ClientApi";
import UserApi from "../api/UserApi";

export type UserHospital = {
  name: String,
  email: String,
  password: String,
  city:String,
  phoneNumber:String,
 // avatarUrl: String
  description:String
}
export type UserIntern = {
  email: String,
  name: String,
  password: String,
  avatarUrl: String
}

export type Post = {
  message: String,
  sender: String,
  avatarUrl: String
}

export type UserUpdate = {
  id: any,
  idIntern:String,
  name: String,
  avatarUrl: String,
  email: String,
    city: String,
                educationalInstitution: String,
                typeOfInternship: String,
                GPA: String,
                description: String,
                partnerID: String,
                phoneNumber:String,

}
const getUserTypeByEmail = async (email: string) => {
  console.log('getUserTypeByEmail')
  console.log(email)
  // if (!email) {
  //   console.log("User email WRONG");
  //   return null;
  // }
  try {
    console.log('im here')
    const res = await UserApi.getUserTypeByEmail(email);
    console.log('resrrrr'+ JSON.stringify(res))
    if (!res.ok) {
      console.log("fail getting user from db by email");
      return null;
    } else {
    return res.data.userType;
    }
  } catch (err) {
    console.log('fail getting user from db by email ' + err);
    return null;
  }
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  try {
    const res = await UserApi.uploadImage(body);
    if (!res.ok) {
      console.log("save failed " + res.problem);
    } else {
      if(res.data){
        const d: any = res.data
        console.log("url: " + d.url)
        return d.url
      }
    }
  } catch (err) {
    console.log("save failed " + err);
  }
  return ""
};

const getUserById = async (id:string) =>{
  if(!id){
    console.log("fail getting user from db by ID || User ID WRONG");
    return null
  }
  try{
    const res = await UserApi.getUserById(id);
    console.log('RES')
    console.log(res)
    if(!res.ok) {
      console.log("fail getting user from db by ID");
    } else {
      if(res.data.userType==='hospital'){
        console.log(res)
        const d: any = [res.data.name,res.data.city,res.data.email,res.data.description,res.data.hospitalQuantity,res.data.phoneNumber]
        return d
      }
      else if(res.data.userType==='intern')
      {
        console.log(res)
        const d: any = [res.data.name,res.data.city,res.data.email,
          res.data.description,res.data.GPA,res.data.phoneNumber,res.data.avatarUrl,
          res.data.educationalInstitution,res.data.id,res.data.partnerID,res.data.typeOfInternship,res.data.idIntern]
        return d
      }
    }
  }catch(err) {
    console.log('fail getting user from db by ID ' + err)
  }
}

const addNewPost = async (post:Post)=>{
  const data = {
    message: post.message,
    sender: post.sender,
    avatarUrl: post.avatarUrl
  }
  try {
      const res = await UserApi.addNewPost(data)
      console.log('success add new post')
  } catch (err) {
      console.log("add new post failed: " + err)
  }
}

const getAllPosts = async () => {
  const res:any = await UserApi.getAllPosts()
  let d = Array<Post>()
  if (res.data) {
      res.data.forEach((obj: any) => {
        const s = obj.avatarUrl
          const p: Post = {
            message: obj.message,
            sender: obj.sender,
            avatarUrl: s
          }
          console.log(obj)
          console.log(p.sender)
          console.log(p.message)
          d.push(p)
      });
  }
  return d
}

const upadteUser = async (user_update:UserUpdate) => {
  const data = {
    id: user_update.id,
    idIntern:user_update.idIntern,
    name: user_update.name,
    avatarUrl: user_update.avatarUrl,
    email: user_update.email,
    city: user_update.city,
                educationalInstitution: user_update.educationalInstitution,
                typeOfInternship: user_update.typeOfInternship,
                GPA: user_update.GPA,
                description: user_update.description,
                partnerID: user_update.partnerID,
                phoneNumber:user_update.phoneNumber

  }

  try {
    const res:any = await UserApi.upadteUser(data)
    console.log('success update user')
  } catch (err) {
    console.log("update user failed: " + err)
  }
}


export default {uploadImage,getUserById,addNewPost,getAllPosts,upadteUser,getUserTypeByEmail}