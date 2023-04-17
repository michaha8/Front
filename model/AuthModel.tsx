import AuthApi from "../api/AuthApi";
import apiClient from "../api/ClientApi";


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
  userType:'intern',
  preferenceArray: string[]
}
export type UserHospital = {
  email: String,
  name: String,
  password: String,
  phoneNumber:String,
  city:String,
  description:String,
  userType:'hospital'
  hospitalQuantity:String

}


export type Token = {
    refreshtoken: string,
}

type UserInfo = {
    accessToken: string;
    refreshToken: string;
    id: string;
};

const registerIntern = async (user: UserIntern) => {
    const data = {
      idIntern:user.idIntern,
      email: user.email,
      name: user.name,
      password: user.password,
      avatarUrl: user.avatarUrl,
      userType:user.userType,
      phoneNumber:user.phoneNumber,
      city:user.city,
      GPA:user.GPA,
      institution:user.institution,
      specialization:user.specialization,
      description:user.description,
      partnerID:user.partnerID
    }
    try {
        const res = await AuthApi.register(data)
        console.log('success signup authmodel')
    } catch (err) {
        console.log("register failed: " + err)
    }
}

const registerHospital = async (user: UserHospital) => {
  const data = {
    email: user.email,
    name: user.name,
    password: user.password,
    userType:user.userType,
    phoneNumber:user.phoneNumber,
    city:user.city,
    hospitalQuantity:user.hospitalQuantity,
    description:user.description
  }
  try {
      const res = await AuthApi.register(data)
      console.log('success signup authmodel')
  } catch (err) {
      console.log("register failed: " + err)
  }
}

// const login = async (user: User): Promise<string | UserInfo | any> => {
//     const d = {
//       email: user.email,
//       name: user.name,
//       password: user.password,
//       avatarUrl: user.avatarUrl
//     };
//     try {
//       const res = await AuthApi.login(d);
//       const data: UserInfo | any = res.data;
//       if (typeof data.id === 'undefined') {
//         console.log('data err');
//         return data.id as string;
//       } else {
//         const { accessToken, id, refreshToken } = data;
//         const userRes = [accessToken, id, refreshToken];
//         console.log('good data');
//         return userRes;
//       }
//     } catch (err) {
//       console.log('login failed:', err);
//       throw err;
//     }
//   };
export type User = UserIntern | UserHospital;
export type UserLogIn={email:String,password:String}
const login = async (user: User): Promise<string | UserInfo | any> => {
  console.log('Log In User '+JSON.stringify(user))
  if (user.userType === 'intern') {
    const intern = {
      email: user.email,
      name: user.name,
      password: user.password,
      avatarUrl: user.avatarUrl,
      institution: user.institution,
      specialization: user.specialization,
      phoneNumber: user.phoneNumber,
      GPA: user.GPA,
      city: user.city,
      description: user.description,
      partnerID: user.partnerID,
      userType: user.userType
    };
    try {
      const res = await AuthApi.login(intern);
      const data: UserInfo | any = res.data;
      if (typeof data.id === 'undefined') {
        console.log('data err');
        return data.id as string;
      } else {
        const { accessToken, id, refreshToken } = data;
        const userRes = [accessToken, id, refreshToken];
        console.log('good data');
        return userRes;
      }
    } catch (err) {
      console.log('login failed:', err);
      throw err;
    }
  } else if (user.userType === 'hospital') {
    const hospital = {
      email: user.email,
      name: user.name,
      password: user.password,
      phoneNumber: user.phoneNumber,
      city: user.city,
      description: user.description,
      userType: user.userType,
      hospitalQuantity: user.hospitalQuantity
    };
    try {
      const res = await AuthApi.login(hospital);
      const data: UserInfo | any = res.data;
      if (typeof data.id === 'undefined') {
        console.log('data err');
        return data.id as string;
      } else {
        const { accessToken, id, refreshToken } = data;
        const userRes = [accessToken, id, refreshToken];
        console.log('good data');
        return userRes;
      }
    } catch (err) {
      console.log('login failed:', err);
      throw err;
    }
  } else {
    throw new Error('Invalid user type');
  }
};


  const logout = async (): Promise<void> => {
    console.log("logout");
    await AuthApi.logout();
  };

export default {registerIntern,registerHospital, login, logout}