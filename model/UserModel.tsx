import FormData from "form-data";
import AuthApi from "../api/AuthApi";
import apiClient from "../api/ClientApi";
import UserApi from "../api/UserApi";

export type UserHospital = {
  email: String,
  name: String,
  password: String,
  phoneNumber:String,
  city:String,
  description:String,
  userType:'hospital'
  hospitalQuantity:String,
  preferenceArray: string[]

}
export type UserUpdateHospital = {
  id: any,
  email: String,
  name: String,
  phoneNumber:String,
  city:String,
  description:String,
  hospitalQuantity:String,
  preferenceArray: string[]

}


export type Post = {
  sender: String
 
}
export type UserIntern = {
  idIntern: String,
  email: String,
  name: String,
  password: String,
  avatarUrl: String,
  institution:String,
  specialization:String,
  phoneNumber:String,
  GPA:String,
  city:String,
  description:String,
  partnerID:String,
  userType:'intern'  ,
  preferenceArray: string[]

}
export type UserUpdateIntern = {
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
                userType:string,
                preferenceArray: string[]

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
const getUserTypeByID = async (id: string) => {
  console.log('getUserTypeByID')
  console.log(id)
  // if (!email) {
  //   console.log("User email WRONG");
  //   return null;
  // }
  try {
    console.log('im here')
    const res = await UserApi.getUserTypeByID(id);
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
const getUserbyEmail = async (email: string) => {
  console.log('getUserTypeByEmail')
  console.log(email)
  // if (!email) {
  //   console.log("User email WRONG");
  //   return null;
  // }
  try {
    console.log('im here')
    const res = await UserApi.getUserTypeByEmail(email);
    if (!res.ok) {
      console.log("fail getting user from db by email");
      return null;
    } else {
    return res.data
    }
  } catch (err) {
    console.log('fail getting user from db by email ' + err);
    return null;
  }
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  console.log(`ImageUrl in UploadImage ${imageURI}`)
  body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
  try {
      const res = await UserApi.uploadImage(body)
      if (!res.ok) {
          console.log("save failed " + res.problem)
      } else {
          if (res.data) {
              const d: any = res.data
              console.log("----= url:" + d.url)
              
              // Replace \ with / in the URL
              let fixedUrl = d.url.replace(/\\/g, '/');
              console.log("fixed url: " + fixedUrl)

              return fixedUrl
          }
      }
  } catch (err) {
      console.log("save failed " + err)
  }
  return ""
}

const getImage = async (filename: string) => {
  try{
    console.log(`fileNAme ${filename}`)
    const x= await UserApi.getImage(filename)
    console.log(`X ${x}`)
    if(x){
      return x
    }
    else 
    console.log('Faield get Image')
  }catch (err) {
    console.log("Faield get Image " + err)
}
 
}
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
        const d: any = [res.data.name
          ,res.data.city
          ,res.data.email
          ,res.data.description,
          res.data.hospitalQuantity,
          res.data.phoneNumber
          ,res.data.preferenceArray
          ,res.data.hospitalQuantity,res.data.matchingArrayTabuSearch]
        return d
      }
      else if(res.data.userType==='intern')
      {
        console.log(res)
        const d: any = [res.data.name,res.data.city,res.data.email,
          res.data.description,res.data.GPA,res.data.phoneNumber,res.data.avatarUrl,
          res.data.educationalInstitution,res.data.id,res.data.partnerID,res.data.typeOfInternship,res.data.idIntern ,res.data.preferenceArray, res.data.userType, res.data.matchingArrayTabuSearch]
        return d
      }
    }
  }catch(err) {
    console.log('fail getting user from db by ID ' + err)
  }
}

const getUserByIdIntern = async (id:string) =>{
  console.log("getUserByIdIntern")
  if(!id){
    console.log("fail getting user from db by ID || User ID WRONG");
    return null
  }
  try{
    const res = await UserApi.getUserByIdIntern(id);
    console.log('RES')
    console.log(res)
    if(!res.ok) {
      console.log("fail getting user from db by ID");
    } else {
        console.log(res)
        const d: any = [res.data.name,res.data.city,res.data.email,
          res.data.description,res.data.GPA,res.data.phoneNumber,res.data.avatarUrl,
          res.data.educationalInstitution,res.data.id,res.data.partnerID,res.data.typeOfInternship,res.data.idIntern ,res.data.preferenceArray,res.data._id]
        return d
    }
  }catch(err) {
    console.log('fail getting user from db by ID ' + err)
  }
}

const addNewPost = async (post:Post)=>{
  const data = {
    sender: post.sender,
    
  }
  try {
      const res = await UserApi.addNewPost(data)
      console.log('success add new post')
  } catch (err) {
      console.log("add new post failed: " + err)
  }
}

const getAllHospitalsUsers=async()=>{
  const res:any = await UserApi.getAllHospitalsUsers()
  console.log('GetALlHospitalsUsers')
  console.log('GetALlHospitalsUsers')
  console.log('GetALlHospitalsUsers')
  console.log('res')
  console.log(res)
  let d = Array<UserHospital>()
  if (res.data) {
    res.data.forEach((obj: any) => {
      
        const p: UserHospital = {
         name:obj.name, 
         email: obj.email,
         city: obj.city,
                     hospitalQuantity:obj.hospitalQuantity,
                     description: obj.description,
                     phoneNumber:obj.phoneNumber,
                     userType:obj.userType,
                     password:obj.password,
                     preferenceArray:obj.prefernceArray,
          
        }
        console.log(`obj`)
        console.log(obj)
        d.push(p)
        console.log('res')
        console.log('res')
        console.log('res')
        console.log('res')
        console.log('p')
        console.log(p)
        
    });
}
console.log('res')
console.log('res')
console.log(d)
console.log('res')
return d
}
const getAllInternsUsers=async()=>{
  const res:any = await UserApi.getAllInternsUsers()
  console.log('res')
  console.log('res')
  console.log('res')
  console.log('res')

  console.log(res)
  let d = Array<UserIntern>()
  if (res.data) {
    res.data.forEach((obj: any) => {
      const s = obj.avatarUrl
        const p: UserIntern = {
         idIntern:obj.idIntern,
         name:obj.name, email: obj.email,
         city: obj.city,
                     institution: obj.educationalInstitution,
                     specialization: obj.typeOfInternship,
                     GPA: obj.GPA,
                     description: obj.description,
                     partnerID: obj.partnerID,
                     phoneNumber:obj.phoneNumber,
                     userType:obj.userType,
                     password:obj.password,
                     preferenceArray:obj.prefernceArray,

          avatarUrl: s
        }
        console.log(`obj`)
        console.log(obj)
        d.push(p)
        console.log('res')
        console.log('res')
        console.log('res')
        console.log('res')
        console.log('p')
        console.log(p)
        
    });
}
console.log('res')
console.log('res')
console.log(d)
console.log('res')
return d
}
const getAllPosts = async () => {
  const res:any = await UserApi.getAllPosts()
  let d = Array<Post>()
  if (res.data) {
      res.data.forEach((obj: any) => {
        const s = obj.avatarUrl
          const p: Post = {
            sender: obj.sender,
          }
          console.log(obj)
          console.log(p.sender)
          d.push(p)
      });
  }
  return d
}

const upadteUserIntern = async (user_update:UserUpdateIntern) => {
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
                phoneNumber:user_update.phoneNumber,
                preferenceArray:user_update.preferenceArray,
                userType:user_update.userType
                

  }
  console.log(user_update.preferenceArray)
  try {
    const res:any = await UserApi.upadteUser(data)
    console.log('success update user')
  } catch (err) {
    console.log("update user failed: " + err)
  }
}
const upadteUserHospital = async (user_update:UserUpdateHospital) => {
  const data = {
    id: user_update.id,
    name: user_update.name,
    email: user_update.email,
    city: user_update.city,     
    hospitalQuantity:user_update.hospitalQuantity,
                description: user_update.description,
                phoneNumber:user_update.phoneNumber,
                preferenceArray:user_update.preferenceArray
                

  }
  try {
    const res:any = await UserApi.upadteUser(data)
    console.log('success update user')
  } catch (err) {
    console.log("update user failed: " + err)
  }
}
const runAlgorithm1= async () => {
  UserApi.runAlgorithm1()
}
const runAlgorithm2= async () => {
  UserApi.runAlgorithm2()
}
const checkIfAllInternsAddPreference = async () => {
  console.log("I'm Here --- checkIfAllInternsAddPreference");
  const res = await UserApi.checkIfAllInternsAddPreference();

  let hospitals = Array()
  if (res.data.hospitals) {
    res.data.hospitals.forEach((obj: any) => {
        const p = {
         name:obj.name, 
         email: obj.email,
         phoneNumber:obj.phoneNumber
        }
        hospitals.push(p)
    });
}
let interns = Array()
if (res.data.interns) {
  res.data.interns.forEach((obj: any) => {
      const p = {
       name:obj.name, 
       email: obj.email,
       phoneNumber:obj.phoneNumber
      }
      interns.push(p)
  });
}

console.log(interns)
console.log(hospitals)

  // Return the arrays
  return { interns, hospitals };
};

export default {getImage,uploadImage,getUserById,addNewPost,getAllPosts,upadteUserIntern,getUserTypeByEmail
  ,getAllInternsUsers,getUserbyEmail,getUserByIdIntern,upadteUserHospital,getAllHospitalsUsers
  ,getUserTypeByID ,runAlgorithm1,runAlgorithm2,checkIfAllInternsAddPreference}