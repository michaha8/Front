import apiClient from "./ClientApi";

const uploadImage = async (image: any) => {
    
    return apiClient.post("/file/file", image)
}
const getImage = async (filename: string) => {
    const response = await apiClient.get(`/uploads/${filename}`, { responseType: 'blob' });
  
    // Convert blob to an object URL (Browsers only)
    const imageUrl = URL.createObjectURL(response.data as Blob);
  
    return imageUrl;
}


const getUserById = async (userId:String) => {
    return apiClient.get("user/" + userId)
}
const getUserTypeByEmail = async (userEmail: string) => {
    console.log( "getUserTypeByEmail  getUserTypeByEmail  getUserTypeByEmail")
  return apiClient.get("user/email/"+ userEmail);
};
const getUserByEmail = async (userEmail: string) => {
    console.log( "getUserByEmail  getUserByEmail  getUserByEmail")
    return apiClient.get("user/email/"+ userEmail);
  };
  const getUserTypeByID = async (userID: string) => {
    console.log( "getUserTypeByID")
    return apiClient.get("user/id/"+ userID);
  };
const getAllInternsUsers= async()=>{
    console.log('getAllInternsUsers')
    return apiClient.get('user/')
}
const getAllHospitalsUsers = async () => {
    console.log('getAllHospitalsUsers')
    return apiClient.get('user/hospital/getAllHospitals/')
  }
const getUserByIdIntern=async(userIdIntern:string)=>{
    console.log('getUserByIdIntern')
    return apiClient.get("user/idIntern/"+userIdIntern)
}
// const getAllHospitalsUsers= async()=>{
//     console.log('getAllHospitalsUsers')
//     return apiClient.get('hospital/user/')
// }

const addNewPost = async (postJson:any) => {
    return apiClient.post("post/" , postJson)
}
const runAlgorithm1= async () => {
    console.log('Im here run algorithm 1')
    return apiClient.get("user/algorithm/runAlgorithm")
}
const runAlgorithm2= async () => {
    console.log('Im here run algorithm 2')
    return apiClient.get("user/algorithm/runTabuSearchAlgorithm")
}
const checkIfAllInternsAddPreference=async () => {
    console.log('checkIfAllInternsAddPreference')
    return apiClient.get('user/checkIfAllInternsAddPreference/checkIfAllInternsAddPreference')
}
const getAllPosts = async () => {
    return apiClient.get("post/")
}

const upadteUser = async (userUpdatJson:any) => {
    return apiClient.put("user/",userUpdatJson)
}

export default {uploadImage,getImage, getUserById,addNewPost,getAllPosts,
    upadteUser,getUserTypeByEmail,getAllInternsUsers,getUserByEmail
    ,getUserByIdIntern,getAllHospitalsUsers,getUserTypeByID,runAlgorithm1,runAlgorithm2,checkIfAllInternsAddPreference };