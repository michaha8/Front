import MaterialButtonPrimary from "../buttons/LogInBt"
import MaterialButtonDark from "../buttons/LogInBt"
import React, { Component , useEffect,FC, useState }from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AuthModel, { UserIntern,UserHospital } from "../model/AuthModel";
import { AsyncStorage } from 'react-native';
import UserApi from "../api/UserApi";
// const getUserTypeById = async (id: string): Promise<string | undefined> => {
//   try {
//     // Retrieve user ID from AsyncStorage
//     const storedId = await AsyncStorage.getItem('id');
//     if (!storedId || storedId !== id) {
//       throw new Error('User ID not found in AsyncStorage');
//     }
    
//     // Query server or local storage for user info
//     const user = await fetchUserById(id); // replace with your own function to fetch user by ID
//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Return user type
//     return user.userType;
//   } catch (error) {
//     console.log('Error retrieving user type:', error);
//     return undefined;
//   }
// };
const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [userEmail, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarUri, setAvatrUri] = useState("")
  const[hospitalQuantity,setHospitalQuantity]=useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const[id,setID]=useState<string>("ID");
  const[institution,setInstitution]=useState<string>("");
  const[specialization,setSpecialization]=useState<string>("")
  const[phoneNumber,setPhoneNuber]=useState<string>("")
  const[GPA,setGPA]=useState<string>("")
  const[city,setCity]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[partnerID,setPartnerID]=useState<string>("")
  //Stay LoggedIn
   useEffect(() => {
     AsyncStorage.getItem('refreshToken').then(async token => {
       if (token) {
         navigation.replace("HomePageHospital");
       }
    });
   }, [navigation]);
  
  const pressHandlerLogin = async () => {
    console.log('Press Log In BT');
  
    const user:  UserHospital = 
      {
        email: userEmail,
        name: name,
        password: password,
        hospitalQuantity: hospitalQuantity,
        userType: 'hospital',
        city: city,
        phoneNumber: phoneNumber,
        description: description
      };
      console.log("USER " +JSON.stringify(user))
    try {
      const response = await AuthModel.login(user);
      console.log("RESPONSE"+JSON.stringify(response))
      if (!response) {
        console.log('login failed');
        Alert.alert("Wrong Email or password");
        return;
      }
  
      const [accessToken, id, refreshToken, userType] = response;
      console.log(user)
      
      console.log('userType:', user.userType);
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      const RealUser=UserApi.getUserById(id)
      console.log('RealUser' +JSON.stringify(RealUser))
       navigation.replace("HomePageHospital");
    } catch (error) {
      console.log('login failed:', error);
      Alert.alert("Wrong Email or password");
    }
  };
  

  const pressHandlerSignUpHospital = () => {
    navigation.navigate("SignupPageHospital");
  };
  const pressHandlerSignUpIntern = () => {
    navigation.navigate("SignupPageIntern");
  };
  const pressHandlerForgetPassword = () => {
    //navigation.navigate("forgetPassword");
    // navigation.navigate('HomePageHospital')
    navigation.navigate('AllPostsPage')
    //navigation.navigate('HomePageIntern')
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Enter Email"
        onChangeText={setEmail}
        value={userEmail}
        />
        <TextInput
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true} 
        />
        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pressHandlerLogin}>
        <Text style={styles.buttonText}>{"Log in As Hospital"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pressHandlerSignUpHospital}>
        <Text style={styles.buttonText}>{"Sign Up as Hospital"}</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.FPBT}onPress={pressHandlerForgetPassword}>
        <Text style={styles.buttonTextFPBT}>{"Forget Password?"}</Text>
        </TouchableOpacity>
        </View>

      </View>




      
    {/* <View style={styles.container}>
      <View style={styles.rect}>
        <TextInput placeholder="Enter Email"
         style={styles.textInputEmail} 
          onChangeText={onText1Change}
         value={userEmail}></TextInput>
      </View>
      <View style={styles.rect1}>
        <TextInput placeholder="Enter Password" 
        style={styles.textInputPassword} 
        secureTextEntry={true} 
        onChangeText={onText2Change} 
        value={password}
        ></TextInput>
      </View>
      <View style={styles.materialButtonPrimary}>
      <TouchableOpacity style={[styles.containerBt]} onPress={pressHandlerLogin}>
      <Text style={styles.caption}>{"Log In"}</Text>
    </TouchableOpacity>
    </View>
      <View style={styles.materialButtonDarkRow}>
        <TouchableOpacity style={styles.containerBt} onPress={pressHandlerSignUpIntern}>
        <Text style={styles.caption}>{"Sign Up as Intern"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerBt} onPress={pressHandlerSignUpHospital}>
        <Text style={styles.caption}>{"Sign Up as Hospital"}</Text>
        </TouchableOpacity>
      </View>
    </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FPBT:{
    alignSelf: "center",
    color:'red'
  },
  userPictureStyle: {
    marginTop: 10,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  choosePhotoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
    textAlign:'center'
  },
  takePhotoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007aff",
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  inputError: {
    borderColor: "red",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
    borderRadius: 100,
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 100,
    padding: 5,
   
  },
  buttonText: {
    padding: 10,
  },
  buttonTextFPBT: {
    padding: 10,
    color:'red'
  },
});

export default LoginPage;
