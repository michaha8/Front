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
import UserModel from "../model/UserModel";



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
    const checkEmail=await UserModel.getUserbyEmail(email)
    if(checkEmail){
      Alert.alert('The Email you entered exist in system ')
      return
    }
    
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
      alert("Hi " + name + " Welcome to the app , please log in");
    } catch(err) {
      console.log('fail signup' + err)
    }
    navigation.goBack()
  }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const onConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text === password);
  };

  const onCanceleHandler = () => {
    navigation.goBack();
  };

return (
  <ScrollView style={styles.containerKey}>
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
    onChangeText={(text) => setEmail(text.toLowerCase())}
    placeholder="Enter Email"
    value={email}
    autoComplete='email'
    keyboardType='email-address'
    onBlur={() => {
      if (email && !validateEmail(email)) {
        Alert.alert('Please provide a valid email')
      }
    }}
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
        placeholder="Confirm Password"
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
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
  </ScrollView>
  
);
}
const styles = StyleSheet.create({
  containerKey: {
    
    backgroundColor:'aliceblue',
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    backgroundColor:'aliceblue'
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 2,
    borderColor:'mediumturquoise',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputDescription: {
    height: 80,
    margin: 10,
    borderWidth: 2,
    borderColor:'mediumturquoise',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    

  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "mintcream",
    borderColor:'darkturquoise',
    borderWidth:2,
    padding: 5,
    borderRadius: 10,
  },
  buttonContainer:{
    flex:1,
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor:'aliceblue'
  },inputError: {
    borderColor: "red",
  },
  buttonText: {
    color:'grey',
    padding: 10,
  },
});


export default SignupPageHospital;
