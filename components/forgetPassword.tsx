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
import AuthModel from "../model/AuthModel";

// const ForgetPasswordPage: FC<{ navigation: any,route:any }> = ({ navigation,route }) => {
//   const handleResetPassword = async () => {



//     if (!userEmail) {
//       Alert.alert("Please enter your email address");
//       return;
//     }
//     try {
//       const reqFP:Post={
//         sender:userEmail
//       }
//       try{
//         await UserModel.addNewPost(reqFP)
//         console.log('success Sent Request Forget Password')
//         Alert.alert("success Sent Request Forget Password");
//       } catch(err) {
//         console.log('fail Sent Request Forget Password' + err)
//         Alert.alert("fail Sent Request Forget Password");
//       }
      
//       navigation.goBack();
//     } catch (err) {
//       Alert.alert("fail Sent Request Forget Password");
//     }
//   };
//   const validateEmail = (email) => {
//     // Regular expression for email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
//     return emailRegex.test(email);
//   };

//   const handleEmailChange = (text) => {
//     setEmail(text);
  
//     // Check if the input is a valid email address
//     const isValidEmail = validateEmail(text);
//     if (isValidEmail) {
//       // Input is a valid email address
//       console.log('Valid email address');
//     } else {
//       // Input is not a valid email address
//       console.log('Invalid email address');
//     }
//   };
//     const [userEmail, setEmail] = useState<string>("");
//     const pressHandlerGoBack = () => {
//         navigation.goBack();
//       };

// return(
//     <View style={styles.rootContainer}>
//     <ScrollView>
//         <View style={styles.container}>
//         <View style={styles.imageContainer}>
//         <Image style={styles.image} source={{uri: 'https://www.bney-ayish.muni.il/productImages2/47/2016/12/05/image1480925065.jpg'}}
//         />
//         </View>
//         <Text style={styles.text}>
//             Forget Password
//         </Text>
//         <Text style={styles.tText}>
//         Enter your email and our support team will get back to you as soon as possible for password recovery
//         </Text>
//         <View style={styles.input}>
//       <AntDesign name='mail' size={24} color='gray' style={{ position: 'absolute', left: 12,top:5 }} />
//       <TextInput style={styles.textInput}
//         placeholder='                               '
//         placeholderTextColor='gray'
//         keyboardType="email-address"
//         value={userEmail}
//         autoFocus
//         onChangeText={handleEmailChange}
//       />
//     </View>
//     <View style={styles.buttonsContainer}>
//     <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//     <Text>
//         Submit
//     </Text>
//     </TouchableOpacity>
//     </View>
//     <View >
//     <TouchableOpacity style={styles.FPBT} onPress={pressHandlerGoBack}>
//     <Text style={{color:'red',}}>
//         Go back to Log In page
//     </Text>
//     </TouchableOpacity>
//     </View>
//     </View>
//     </ScrollView>
//     </View>
// )

// }

const ForgetPasswordPage: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const handleResetPassword = async () => {
    if (!userEmail) {
      Alert.alert("Please enter your email address");
      return;
    }
    try {
      const reqFP: Post = {
        sender: userEmail
      };
      try {
        await UserModel.addNewPost(reqFP);
        console.log('success Sent Request Forget Password');
        Alert.alert("success Sent Request Forget Password");
      } catch (err) {
        console.log('fail Sent Request Forget Password' + err);
        Alert.alert("fail Sent Request Forget Password");
      }

      navigation.goBack();
    } catch (err) {
      Alert.alert("fail Sent Request Forget Password");
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setUserEmail(text);

    // Check if the input is a valid email address
    const isValid = validateEmail(text);
    setIsValidEmail(isValid);
  };

  const emailInputStyle = [styles.textInput];
  if (!isValidEmail) {
    emailInputStyle.push(styles.inputError);
  }

  const pressHandlerGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.container}>
        {/* <View style={styles.imageContainer}>
  <Image
    style={styles.image}
    source={{ uri: 'https://www.bney-ayish.muni.il/productImages2/47/2016/12/05/image1480925065.jpg' }}
  />
</View> */}
          <Text style={styles.text}>
            Forget Password
          </Text>
          <Text style={styles.tText}>
            Enter your email and our support team will get back to you as soon as possible for password recovery
          </Text>
          <View style={styles.container}>
            {/* <AntDesign name='mail' size={24} color='gray' style={{ position: 'absolute', left: 12, top: 5 }} /> */}
            <TextInput
  style={[styles.textInput, !isValidEmail ? styles.inputError : null]}
  placeholder='Enter your email'
  placeholderTextColor='gray'
  keyboardType="email-address"
  value={userEmail}
  autoFocus
  onChangeText={handleEmailChange}
/>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.FPBT} onPress={pressHandlerGoBack}>
              <Text style={{ color: 'red' }}>
                Go back to Log In page
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'aliceblue',
      },
  container: {
    flex: 1,
    backgroundColor:'aliceblue'
    ,padding:10
    ,paddingTop:50
  }, FPBT:{
    alignSelf: "center",
    color:'red'
  },
  textInput:{
    flex:1,
    borderWidth:1,
    padding: 5,
    alignSelf:'stretch',
    fontSize: 13,
    color:'black',
    height: 35,
    borderRadius: 10,
     margin: 0,
      borderColor:"darkturquoise",
      marginTop: 0,
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
    backgroundColor: "aliceblue",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  
  image: {
    backgroundColor: 'transparent',
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 10,
     margin: 12,
      borderWidth: 1,
      color:'aliceblue',
      borderColor:"aliceblue",
      marginTop: 20,
      
     
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
    borderColor:"red",
    // color:'red'
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