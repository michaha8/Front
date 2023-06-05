
import React, { Component , useEffect,FC, useState, useCallback }from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import AuthModel, { UserIntern,UserHospital } from "../model/AuthModel";
import { AsyncStorage } from 'react-native';
import UserApi from "../api/UserApi";
import UserModel from "../model/UserModel";
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
  const [isValidEmail, setIsValidEmail] = useState(false);
  const[userTypeCheck,setUserType]=useState<string>("")
  
  // Stay LoggedIn
  //  useEffect(() => {
  //    AsyncStorage.getItem('refreshToken').then(async token => {
  //     console.log("Token")
  //     console.log(token)
  //      if (token) {
  //       const email = await AsyncStorage.getItem('email');
  //       const userType= await UserModel.getUserTypeByEmail(email)
  //       console.log("User TYpe")
  //       console.log(userType)
  //       console.log(email)
  //       if (userType === 'intern') {
  //         navigation.replace("HomePageIntern");
  //       } else {
  //         navigation.replace("HomePageHospital");
  //       }
        
  //      }
  //   });
  //  }, [navigation]);

  const pressHandlerLogin = useCallback(async () => {
    console.log('Press Log In BT');
    console.log('user'+userTypeCheck)

  if(userTypeCheck==='intern'){
    const user:  UserIntern =
    {
       email: userEmail,
       name: name,
       password: password,
       avatarUrl: avatarUri,
       idIntern: id,
       institution: institution,
       specialization: specialization,
       phoneNumber: phoneNumber,
       GPA: GPA,
       city: city,
       description: description,
       partnerID: partnerID,
       userType: 'intern'
     }
     console.log("USER " +JSON.stringify(user))
   try {
     const response = await AuthModel.login(user);
     console.log("RESPONSE"+JSON.stringify(response))
     if (!response) {
       console.log('login failed');
       setIsValidEmail(false)
       Alert.alert("Wrong Password");
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
     navigation.replace("HomePageIntern");
     setIsValidEmail(false)
  
   } catch (error) {
     console.log('login failed:', error);
     setIsValidEmail(false)
     Alert.alert("Wrong Password");
   }
  }
  else if(userTypeCheck==='hospital'){
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
        Alert.alert("Wrong Password");
        return;
      }
  
      const [accessToken, id, refreshToken, userType] = response;
      console.log(user)
      
      console.log('userType: ', user.userType);
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      const RealUser=UserApi.getUserById(id)
      console.log('RealUser' +JSON.stringify(RealUser))
       navigation.replace("HomePageHospital");
       setIsValidEmail(false)
    } catch (error) {
      console.log('login failed:', error);
      Alert.alert("Wrong Email or password");
    }
  }
  else if(userTypeCheck==='admin'){
     navigation.replace("AdminHomePage");
     setIsValidEmail(false)
  }
  else{
    console.log(userEmail)
    console.log(password)
    Alert.alert("Email Dont Exist");
  }
  
  }, [password]);
  

  const pressHandlerSignUpHospital = () => {
    navigation.navigate("SignupPageHospital");
  };
  const pressHandlerSignUpIntern = () => {
    navigation.navigate("SignupPageIntern");
  };
  const pressHandlerForgetPassword = () => {
    navigation.navigate("forgetPassword");
  };

  const pressHandlerSendEmail=async()=>{
    console.log('try Log In '+ userEmail)
    const type= await UserModel.getUserTypeByEmail(userEmail)
    console.log('try Log In type '+ JSON.stringify(type))
    setUserType(type)
    if(type){
    setIsValidEmail(true)
    return type}
    else
      Alert.alert('The Email Dont Exsist In system , Please try again')
   
  }
 
  return (
    <View style={styles.container}>
<ScrollView>
  {isValidEmail ? (
       <KeyboardAvoidingView style={styles.container} behavior='padding'>
       <ScrollView>
       <View style={styles.container}>
         <TextInput
         style={styles.input}
         placeholderTextColor="grey"
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
               keyboardType='default'
             />
           <View style={styles.buttonsContainer}>
               <TouchableOpacity style={styles.button} onPress={pressHandlerLogin}>
                 <Text style={styles.buttonText}>{"Log In"}</Text>
               </TouchableOpacity>
           </View>
         <View style={styles.buttonsContainer}>
         <TouchableOpacity style={styles.button} onPress={pressHandlerSignUpIntern}>
         <Text style={styles.buttonText}>{"Sign Up as Intern"}</Text>
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
     </ScrollView>
     </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        onChangeText={setEmail}
        value={userEmail}
      />
      <TouchableOpacity style={styles.button} onPress={pressHandlerSendEmail}>
        <Text style={styles.buttonText}>{"Send Email"}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pressHandlerSignUpIntern}>
          <Text style={styles.buttonText}>{"Sign Up as Intern"}</Text>
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
  )}
</ScrollView>
</View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'aliceblue'
  },
  FPBT:{
    alignSelf: "center",
    color:'lavender'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'grey',
    borderColor:"darkturquoise",
    borderRadius: 10,
    marginTop: 20,
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
    backgroundColor: "mintcream",
    borderColor:'darkturquoise',
    borderWidth:2,
    borderStyle:'solid',
    borderRadius: 100,
    padding: 5,
   
  },
  buttonText: {
    padding: 10,
    color:'grey'
  },
  buttonTextFPBT: {
    padding: 10,
    color:'red'
  },
});

export default LoginPage;
