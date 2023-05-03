import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import React, { FC, useState } from "react";
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
  Button,
  Modal,
} from "react-native";
import AuthModel from "../model/AuthModel";
import UserModel, { Post } from "../model/UserModel";

const AdminHomePage: FC<{ navigation: any }> = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [res, setRes] = useState({ interns: [], hospitals: [] });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const runAlgorithm1Handler = async () => {
    const check=await handleBt3()
    console.log(check)
    if(check){
    console.log("run Algorithm 1");
    UserModel.runAlgorithm1();
    }
  };

  const runAlgorithm2Handler = async () => {
    console.log("run Algorithm 2");
    UserModel.runAlgorithm2();
  };

  async function clearStorage() {
    await AsyncStorage.clear();
  }

  const handlerGoBack = async () => {
    console.log("Logging out...");
    await AuthModel.logout();
    console.log("Clearing storage...");
    await clearStorage();
    console.log("Resetting navigation stack...");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LoginPage" }],
      })
    );
  };

  const handleBt3 = async () => {
    const res = await UserModel.checkIfAllInternsAddPreference();
    console.log("handleBt3");
    if (res) {
      setRes(res);
      setIsModalVisible(true);
    }
    else
    return true
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={runAlgorithm1Handler}>
        <Text style={styles.buttonText}>Algorithm 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={runAlgorithm2Handler}>
        <Text style={styles.buttonText}>Algorithm 2 (Tabu Search)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlerGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide">
  <View style={styles.containerModal}>
    <View style={styles.modal}>
      <Text style={[styles.modalTitle, { color: 'black' , fontSize: 16 }]}>The following users have not yet filled out their preference list, please contact them so that the pairing algorithm will be the most effective</Text>
      <Text style={styles.modalTitle}>Interns:</Text>
      <ScrollView style={styles.userScrollView}>
        {res.interns.map((intern, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.userTitle}>Name:</Text>
            <Text style={styles.userDetails}>{intern.name}</Text>
            <Text style={styles.userTitle}>Email:</Text>
            <Text style={styles.userDetails}>{intern.email}</Text>
            <Text style={styles.userTitle}>Phone:</Text>
            <Text style={styles.userDetails}>{intern.phoneNumber}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.modalTitle}>Hospitals:</Text>
      <ScrollView style={styles.userScrollView}>
        {res.hospitals.map((hospital, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.userTitle}>Name:</Text>
            <Text style={styles.userDetails}>{hospital.name}</Text>
            <Text style={styles.userTitle}>Email:</Text>
            <Text style={styles.userDetails}>{hospital.email}</Text>
            <Text style={styles.userTitle}>Phone:</Text>
            <Text style={styles.userDetails}>{hospital.phoneNumber}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}></View>
      <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};
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
    },
});
export default AdminHomePage