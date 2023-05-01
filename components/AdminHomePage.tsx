import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
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
import AuthModel from "../model/AuthModel";
import UserModel, {Post} from "../model/UserModel";


const AdminHomePage: FC<{ navigation: any }> = ({ navigation }) => {
   
    const runAlgorithm1Handler = async () => {
    console.log('run Algorithm 1')
    UserModel.runAlgorithm1();
  };
  const runAlgorithm2Handler = async () => {
    console.log('run Algorithm 2')
    UserModel.runAlgorithm2();
  };
  async function clearStorage() {
    await AsyncStorage.clear();
  }
  const handlerGoBack=async ()=>{
    console.log("Logging out...");
    await AuthModel.logout();
    console.log("Clearing storage...");
    await clearStorage();
    console.log("Resetting navigation stack...");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  }
  
    const [userEmail, setEmail] = useState<string>("");
  const handleBt3=async () => {
    const res=await UserModel.checkIfAllInternsAddPreference()
    console.log("handleBt3")
    console.log(res.hospitals)
    console.log(res.interns)
  }

return(
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={runAlgorithm1Handler}>
      <Text style={styles.buttonText}>Algorithm 1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}onPress={runAlgorithm2Handler}>
      <Text style={styles.buttonText}>Algorithm 2 (Tabu Search)</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleBt3}style={styles.button}>
      <Text style={styles.buttonText} >Button 3</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handlerGoBack}>
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
)

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 20,
      padding: 20,
      marginVertical: 10,
      minWidth: '80%',
      maxWidth: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
export default AdminHomePage