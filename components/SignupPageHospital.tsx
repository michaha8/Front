import React, { Component } from "react";
import MaterialButtonPrimary from "../buttons/MaterialButtonPrimary";
import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  TextBase,
} from "react-native";
import AuthModel, { UserHospital } from "../model/AuthModel";
import * as ImagePicker from 'expo-image-picker';



const SignupPageHospital: FC<{ navigation: any }> = ({ navigation }) => {
 // const [avatarUri, setAvatrUri] = useState("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const[phoneNumber,setPhoneNumber]=useState<string>("")
  const[city,setCity]=useState<string>("")
  

  // const handleChoosePhoto = async () => {
  //   try{
  //     const res = await ImagePicker.launchImageLibraryAsync()
  //     if(!res.canceled && res.assets.length > 0){
  //       const uri = res.assets[0].uri;
  //       setAvatrUri(uri)
  //     }
  //   }catch(err){
  //     console.log("open camera error" + err)
  //   }
  // };

  // const handleTakePhoto = async () => {
  //   try{
  //     const res = await ImagePicker.launchCameraAsync()
  //     if(!res.canceled && res.assets.length > 0){
  //       const uri = res.assets[0].uri;
  //       setAvatrUri(uri)
  //     }
  //   }catch(err){
  //     console.log("open camera error" + err)
  //   }
  // };

  const pressHandlerSignUp = async () => {
    alert("Hi " + name + " Welcome to the app , please log in");
    const user: UserHospital = {
      email: email,
      name: name,
      password: password,
      //avatarUrl: avatarUri
      phoneNumber:phoneNumber,
      city:city
    }
    try{
      await AuthModel.register(user)
      console.log('success signup signuppage')
    } catch(err) {
      console.log('fail signup' + err)
    }
    navigation.goBack()
  };

  const onConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text === password);
  };

const func=()=>{
  console.log("presssssdddds")
}

return (
  <View style={styles.container}>
    <View style={styles.rect1}>
      <TextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        style={styles.textInput6}
        onChangeText={setEmail}
        value={email}
      ></TextInput>
    </View>
    <View style={styles.rect2}>
      <TextInput
        placeholder="Enter Phone Number"
        defaultValue=""
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        style={styles.textInput2}
      ></TextInput>
    </View>
    <View style={styles.rect3}>
      <TextInput
        placeholder="Password confirm"
        defaultValue=""
        secureTextEntry={true}
        style={[styles.textInput3, !passwordsMatch ? styles.inputError : null]}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      ></TextInput>
    </View>
    <View style={styles.rect4}>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        style={styles.textInput4}
        onChangeText={setPassword}
        value={password}
      ></TextInput>
    </View>
    <View style={styles.rect5}>
      <TextInput
        placeholder="Enter City"
        style={styles.textInput5}
        onChangeText={setCity}
        value={city}
      ></TextInput>
    </View>
    <View style={styles.rect6}>
      <TextInput
        placeholder="Enter Name"
        onChangeText={setName}
        value={name}
        style={styles.textInput1}
      ></TextInput>
    </View>

    {/* <View style={styles.materialButtonPrimary1Row}>
        <TouchableOpacity style={styles.containerBt} onPress={func}>
        <Text style={styles.caption}>{"Save"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerBt} onPress={func}>
        <Text style={styles.caption}>{"Cancele"}</Text>
        </TouchableOpacity>
      </View> */}
    <View style={styles.materialButtonPrimary1Row}>
      <TouchableOpacity style={styles.containerSaveBt} onPress={func}>
      <Text style={styles.captionSaveBt}>{"Save"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerSaveBt} onPress={func}>
        <Text style={styles.captionSaveBt}>{"Cancele"}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(15,15, 15,0)"
  },
  rect1: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 121,
    marginLeft: 38
  },
  textInput6: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 12,
    marginLeft: 12
  },
  rect2: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 198,
    marginLeft: 38
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 10,
    marginLeft: 12
  },
  rect3: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: -106,
    marginLeft: 38
  },
  textInput3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 15,
    marginLeft: 20
  },
  rect4: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: -104,
    marginLeft: 38
  },
  textInput4: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 11,
    marginLeft: 12
  },
  rect5: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: -111,
    marginLeft: 38
  },
  textInput5: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 10,
    marginLeft: 20
  },
  rect6: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: -169,
    marginLeft: 38
  },
  textInput1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 9,
    marginLeft: 12
  },
  materialButtonPrimary1: {
    height: 44,
    width: 142,
    borderRadius: 100
  },
  materialButtonPrimary2: {
    height: 44,
    width: 137,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 55,
    marginLeft: 19
  },
  materialButtonPrimary1Row: {
    height: 44,
    flexDirection: "row",
    marginTop: "auto",
    alignSelf: "center",
    marginRight: 20,
    marginBottom: 25,
  }, containerSaveBt: {
   backgroundColor: "rgba(0,0,0,1)",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: 2,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.35,
  shadowRadius: 5,
  elevation: 2,
  minWidth: 88,
  paddingLeft: 16,
  paddingRight: 16
},
  
  captionSaveBt: {
    color: "#fff",
    fontSize: 14
  }
});


export default SignupPageHospital;
