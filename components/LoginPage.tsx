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
import AuthModel, { User } from "../model/AuthModel";
import { AsyncStorage } from 'react-native';

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [userEmail, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarUri, setAvatrUri] = useState("")
  //Stay LoggedIn
  //  useEffect(() => {
  //    AsyncStorage.getItem('refreshToken').then(async token => {
  //      if (token) {
  //        navigation.replace("UserDetailsPage");
  //      }
  //   });
  //  }, [navigation]);
  const pressHandlerLogin = async () => {
    console.log('Press Log In BT')
    const user: User = {
      email: userEmail,
      name: name,
      password: password,
      avatarUrl: avatarUri
    };
    const d = await AuthModel.login(user)
    .then(async (data) => {
      if (typeof(data) === 'undefined') {
        console.log('login failed:', data);
        Alert.alert("Wrong Email or password")
      } else {
        console.log('login successful:', data);
        await AsyncStorage.setItem('accessToken', data[0]);
        await AsyncStorage.setItem('id', data[1]);
        await AsyncStorage.setItem('refreshToken', data[2]);
        navigation.replace("UserDetailsPage");
      }
    })
    .catch((err) => {
      console.log('login failed:', err);
      });
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
    navigation.navigate('HomePageIntern')
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
        <Text style={styles.buttonText}>{"Log in"}</Text>
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
