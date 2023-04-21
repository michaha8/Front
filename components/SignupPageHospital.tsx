import React, { Component } from "react";
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
} from "react-native";
import AuthModel, { UserHospital } from "../model/AuthModel";



const SignupPageHospital: FC<{ navigation: any }> = ({ navigation }) => {
 // const [avatarUri, setAvatrUri] = useState("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const[phoneNumber,setPhoneNumber]=useState<string>("")
  const[city,setCity]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[hospitalQuantity,setHospitalQuantity]=useState<string>("0")
  
  const pressHandlerSignUp = async () => {
    if (!name || !email || !phoneNumber || !password || !confirmPassword || !city) {
    alert("All fields are required");
  }
  else{
  
    alert("Hi " + name + " Welcome to the app , please log in");
    const user: UserHospital = {
      email: email,
      name: name,
      password: password,
      userType:'hospital',
      hospitalQuantity:hospitalQuantity,
      phoneNumber:phoneNumber,
      description:description,
      city:city
    }
    try{
      await AuthModel.registerHospital(user)
      console.log('success signup signUpPage')
    } catch(err) {
      console.log('fail signup' + err)
    }
    navigation.goBack()
  }
  };

  const onConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text === password);
  };

  const onCanceleHandler = () => {
    navigation.goBack();
  };

return (
  <ScrollView>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Enter Hospital Name"
        value={name}
        autoFocus
        
      />
       <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Enter Email"
        value={email}
        autoComplete='email'
        keyboardType='email-address'
        
      />
       <TextInput
        style={styles.input}
        onChangeText={setCity}
        placeholder="Enter City"
        value={city}
      />
       <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        placeholder="Enter Phone Numer"
        value={phoneNumber}
        keyboardType='number-pad'
      />
       <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Enter Password"
        value={password}
        secureTextEntry={true}
      />
       <TextInput
        style={[styles.input, !passwordsMatch ? styles.inputError : null]}
        onChangeText={onConfirmPasswordChange}
        placeholder="Confirme Password"
        value={confirmPassword}
        secureTextEntry={true}
      />
       <TextInput
        style={styles.inputDescription}
        onChangeText={setDescription}
        placeholder="Description -
              Add Some Information about the hospital."
        value={description}
        multiline={true}
        numberOfLines={4}
        maxLength={200}>
      </TextInput>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pressHandlerSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCanceleHandler}>
          <Text style={styles.buttonText}>Cacnel</Text>
        </TouchableOpacity>
      </View>
      </View>
  </ScrollView>
  
);
}
const styles = StyleSheet.create({
  containerKey: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 2,
    borderColor:'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputDescription: {
    height: 80,
    margin: 12,
    borderWidth: 2,
    borderColor:'black',
    padding: 10,
    paddingTop: 0,
    borderRadius: 10,
    marginTop: 5,

  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
  },
  button: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2, // add border width
    borderColor: "black", // set border color
  },
  buttonText: {
    padding: 10,
  },
  buttonContainer:{
    flex:1,
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },inputError: {
    borderColor: "red",
  },
  rect1: {
    width: 298,
    alignItems:'center',
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 121,
    marginLeft: 50
  },
  rect7: {
    width: 298,
    alignItems:'center',
    height: 70,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 320,
    marginLeft: 50
  },
  textInput6: {
    fontFamily: "roboto-regular",
    color: "#121212",
    alignItems:'center',
    height: 27,
    width: 259,
    marginTop: 7,
    marginLeft: 12
  },textInput7: {
    fontFamily: "roboto-regular",
    color: "#121212",
    alignItems:'center',
    height: 50,
    width: 259,
    marginTop: 0,
    marginLeft: 10
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
    marginLeft: 50
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 10,
    marginLeft: 10
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
    marginLeft: 50
  },
  textInput3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 17,
    width: 259,
    marginTop: 15,
    marginLeft: 10
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
    marginLeft: 50
  },
  textInput4: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 11,
    marginLeft: 10
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
    marginLeft: 50
  },
  textInput5: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 10,
    marginLeft: 10
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
    marginLeft: 50
  },
  textInput1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 9,
    marginLeft: -14
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
  borderRadius: 100,
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
