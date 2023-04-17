import apiClient from "./ClientApi";

const uploadImage = async (image: any) => {
    return apiClient.post("/file/file", image)
}

const getUserById = async (userId:String) => {
    return apiClient.get("user/" + userId)
}
const getUserTypeByEmail = async (userEmail: string) => {
  return apiClient.get("user/email/"+ userEmail);
};
const getUserByEmail = async (userEmail: string) => {
    return apiClient.get("user/email/"+ userEmail);
  };
const getAllInternsUsers= async()=>{
    console.log('getAllInternsUsers')
    return apiClient.get('user/')
}
// const getAllHospitalsUsers= async()=>{
//     console.log('getAllHospitalsUsers')
//     return apiClient.get('hospital/user/')
// }

const addNewPost = async (postJson:any) => {
    return apiClient.post("post/" , postJson)
}

const getAllPosts = async () => {
    return apiClient.get("post/")
}

const upadteUser = async (userUpdatJson:any) => {
    return apiClient.put("user/",userUpdatJson)
}

export default {uploadImage, getUserById,addNewPost,getAllPosts,upadteUser,getUserTypeByEmail,getAllInternsUsers,getUserByEmail };