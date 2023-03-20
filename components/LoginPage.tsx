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
  const [userEmail, onText1Change] = useState<string>("");
  const [name, onText4Change] = useState<string>("");
  const [password, onText2Change] = useState<string>("");
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

  return (
    <ScrollView>
    <View style={styles.container}>
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
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 116,
    marginLeft: 38
  },
  textInputEmail: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 9,
    marginLeft: 20
  },
  rect1: {
    width: 298,
    height: 46,
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 25,
    marginLeft: 38
  },
  textInputPassword: {
    fontFamily:"sans-serif",
    color: "#121212",
    height: 27,
    width: 259,
    marginTop: 9,
    marginLeft: 20
  },
  materialButtonPrimary: {
    height: 30,
    width: 100,
    marginTop: 29,
    marginLeft: 128
  },
  materialButtonDark: {
    height: 36,
    width: 140,
    flex:2
  },
  materialButtonDark1: {
    height: 36,
    width: 157,
    marginLeft: 2
  },
  materialButtonDarkRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 38,
    marginRight: 23
  },
  containerBt: {
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
  caption: {
    color: "#fff",
    fontSize: 14
  },
  containerLogIn: {
    width: 100,
    height: 36
  },
  materialButtonPrimaryLogIn: {
    height: 36,
    width: 100
  }
});

export default LoginPage;
