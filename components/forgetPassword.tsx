import { AntDesign } from "@expo/vector-icons";
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
  ImageBackground,

} from "react-native";
import UserModel, {Post} from "../model/UserModel";

const ForgetPasswordPage: FC<{ navigation: any }> = ({ navigation }) => {
  const handleResetPassword = async () => {
    if (!userEmail) {
      Alert.alert("Please enter your email address");
      return;
    }
    try {
      const reqFP:Post={
        sender:userEmail
      }
      try{
        await UserModel.addNewPost(reqFP)
        console.log('success Sent Request Forget Password')
        Alert.alert("success Sent Request Forget Password");
      } catch(err) {
        console.log('fail Sent Request Forget Password' + err)
        Alert.alert("fail Sent Request Forget Password");
      }
      
      navigation.goBack();
    } catch (err) {
      Alert.alert("fail Sent Request Forget Password");
    }
  };
  
    const [userEmail, setEmail] = useState<string>("");
    const pressHandlerGoBack = () => {
        navigation.goBack();
      };

return(
    <View style={styles.rootContainer}>
    <ScrollView>
        <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: 'https://www.bney-ayish.muni.il/productImages2/47/2016/12/05/image1480925065.jpg'}}
        />
        </View>
        <Text style={styles.text}>
            Forget Password
        </Text>
        <Text style={styles.tText}>
        Enter your email and our support team will get back to you as soon as possible for password recovery
        </Text>
        <View style={styles.input}>
      <AntDesign name='mail' size={24} color='gray' style={{ position: 'absolute', left: 12,top:5 }} />
      <TextInput style={styles.textInput}
        placeholder='                               '
        placeholderTextColor='gray'
        keyboardType="email-address"
        value={userEmail}
        autoFocus
        onChangeText={(text) => setEmail(text)}
      />
    </View>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
    <Text>
        Sudmit
    </Text>
    </TouchableOpacity>
    </View>
    <View >
    <TouchableOpacity style={styles.FPBT} onPress={pressHandlerGoBack}>
    <Text style={{color:'red',}}>
        Go back to Log In page
    </Text>
    </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    </View>
)

}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'aliceblue',
      },
  container: {
    flex: 1,
    backgroundColor:'white'
  }, FPBT:{
    alignSelf: "center",
    color:'red'
  },
  textInput:{
    padding: 1,
    alignSelf:'flex-start',
    left:30,
    fontSize: 13,
    color:'black'
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
    margin: 10,
    borderWidth: 2,
    borderColor:'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputDescription: {
    height: 80,
    margin: 10,
    borderWidth: 2,
    borderColor:'black',
    padding: 10,
    paddingTop: 0,
    borderRadius: 10,
    marginTop: 5,

  },
  inputError: {
    borderColor: "red",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
  },
  text: {
    padding: 10,
    alignSelf:'center',
    fontSize: 25,
    color:'red'
    
  },
  tText: {
    flex:1,
    padding: 10,
    alignSelf:'center',
    fontSize: 13,
    color:'black'
    ,justifyContent:'center',
    textAlign: 'center'
    
  },
});

export default ForgetPasswordPage