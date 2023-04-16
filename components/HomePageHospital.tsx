import { AntDesign } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import bcrypt from 'bcrypt'
import ReadMore from 'react-native-read-more-text';
import AuthModel from "../model/AuthModel";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel, { UserUpdate } from "../model/UserModel";

const HomePageHospital: FC<{ navigation: any }> = ({ navigation }) => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [description, setDescription] = useState<string>(
    ""
  );
  const [hospitalQuantity,setHospitalQuantity]= useState<string>("");
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPassword, setTempPassword] = useState(password);
  const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);
  const [tempCity, setTempCity] = useState(city);
  const [tempDescription, setTempDescription] = useState(description);

 
  const loadUser = async ()=>{
    const id = await AsyncStorage.getItem('id')
    const res = await UserModel.getUserById(id)
    setName(res[0])
    setCity(res[1])
    setEmail(res[2])
    setDescription(res[3])
    setHospitalQuantity(res[4])
    setPhoneNumber(res[5])
    
  }

  useEffect(() => {
    try{
      loadUser()
    } catch(err) {
      console.log('fail signup' + err)
    }
  }, []);
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
    console.log("Loading user details...");
    loadUser();
  };

interface ValueProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }
  
  const Value: FC<ValueProps> = ({ label, value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const [isExpanded, setIsExpanded] = useState(false);
    
  
    const handleSave = () => {
      setIsEditing(false);
      onChange(tempValue);
    };
  
    const handleCancel = () => {
      setIsEditing(false);
      setTempValue(value);
    };
  
    const _renderTruncatedFooter =(handlePress: () => void) => {
        return (
          <Text style={{ color: "blue" }} onPress={handlePress}>
            Read more
          </Text>
        );
      };
    
      const _renderRevealedFooter =(handlePress: () => void) => {
        return (
          <Text style={{ color: "red" }} onPress={handlePress}>
            Read less
          </Text>
        );
      };
   
  if (isEditing) {
    return (
        <View style={styles.valueContainer}>
          <Text style={styles.label}>{label}: </Text>
          <TextInput
            style={[styles.input]}
            multiline={label === "Description"}
          numberOfLines={label === "Description" ? 4 : 1}
            value={tempValue}
            onChangeText={setTempValue}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave}>
              <AntDesign name="save" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
  } else {
    return (
      <View style={styles.valueContainer}>
        <Text style={styles.label}>{label}: </Text>
        <View style={{ flex: 1 }}>
          <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={_renderTruncatedFooter}
            renderRevealedFooter={_renderRevealedFooter}
          >
            <Text numberOfLines={isEditing ? 10 : 3} style={styles.value}>
              {value}
            </Text>
          </ReadMore>
        </View>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
};

  return (
    <View style={styles.rootContainer}>
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={pressHandlerLogOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <Value label="Name" value={name} onChange={setName} />
<Value label="Email" value={email} onChange={setEmail} />
<Value label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />
<Value label="City" value={city} onChange={setCity} />
<Value label="Hospita Quantity" value={hospitalQuantity} onChange={setHospitalQuantity} />
<Value label="Description" value={description} onChange={setDescription} />

<View style={styles.buttonContainer}>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={pressHandlerLogOut}
        
      >
        <Text style={styles.buttonText}>Watch Interns and choose preference</Text>
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
        backgroundColor: 'white',
      },
container: {
flex: 1,
backgroundColor: "#fff",
alignItems: "center",
justifyContent: "center",
padding: 20,
},
title: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
},
button: {
backgroundColor: "#DDDDDD",
padding: 15,
borderRadius: 50,
// borderStyle:'dotted',
// borderColor:'blue',
// borderBottomWidth:10,
borderWidth:2,
marginBottom: 10,
alignSelf:'center',
},
buttonText: {
fontSize: 18,
fontWeight: "bold",
textAlign: "center",
},
valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: 'wrap'
  },
label: {
alignItems:'center',
fontSize: 18,
fontWeight: "bold",
marginRight: 10,
alignSelf:'flex-start'


},
value: {
fontSize: 18,
flex:1,
overflow: 'hidden',
textOverflow: 'ellipsis',
marginRight: 10,
alignSelf:'flex-start',
right:0

},
input: {
fontSize: 18,
borderBottomWidth: 1,
borderColor: "black",
padding: 5,
marginRight: 10,
flex: 1,
},
buttonContainer: {
alignSelf: 'center',
marginHorizontal: 20,
},
});

export default HomePageHospital;
