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

const MatchingPage: FC<{ navigation: any,route:any }> = ({ navigation,route }) => {
  console.log(route)  
  async function clearStorage() {
    await AsyncStorage.clear();
  }

 
  const pressHandlerLogOut = async () => {
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
    
  };
  
if(route.params.type==='hospital')
{
  return(
    <View style={styles.containerModal}>
    <View style={styles.modal}>
      <Text style={[styles.modalTitle, { color: 'black' , fontSize: 16 }]}>
        You're Matching:
      </Text>
      {route.params.matching.map((item, index) => (
        <Text key={index} style={styles.modalText}>
          {item}
        </Text>
      ))}
    </View>
    <TouchableOpacity style={styles.button} onPress={pressHandlerLogOut}>
      <AntDesign name="logout" size={15} color="black" />
        </TouchableOpacity>
    
  </View>
  )
}
return(
      <View style={styles.containerModal}>
    <View style={styles.modal}>
      <Text style={[styles.modalTitle, { color: 'black' , fontSize: 16 }]}>Youre Matching is {route.params.matching}</Text>
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={pressHandlerLogOut}>
      <AntDesign name="logout" size={15} color="black" />
        </TouchableOpacity>
        </View>
    </View>
    //Add LogOut BT
  
)

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    justifyContent: "center",
    alignItems: "center",
    shadowColor:'black' ,shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // this property is for Android devices
  },userScrollView: {
    maxHeight: 200,
    
  },modalText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  userTitle: {
    fontWeight: 'bold',
  },
  userDetails: {
    marginBottom: 5,
  },
  containerModal: {
    flex: 1,
    backgroundColor: "aliceblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    minWidth: "80%",
    maxWidth: "80%",
    alignItems: "center",
    borderStyle:'dotted',
    borderBottomWidth:5,
    backgroundColor: "mintcream",
    borderColor:'darkturquoise',
    borderWidth:2,
    marginBottom: 0,
    alignSelf:'center'
  },
  buttonText: {
    fontSize: 18,
    color:'grey',
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    },
  modal: {
    backgroundColor: "aliceblue",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginVertical: 10,
    textAlign: "center",
    color: "#007AFF",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    minWidth: "50%",
    maxWidth: "60%",
    alignItems: "center",
    backgroundColor: "mintcream",
    borderColor:'#007AFF',
    borderWidth:2,
    marginBottom: 0,
    alignSelf:'center'
  }, buttonContainer: {
    alignSelf: 'center',
    marginHorizontal: 20,
    minWidth: "24%",
    maxWidth: "25%",
    },
});

export default MatchingPage

function clearStorage() {
  throw new Error("Function not implemented.");
}
