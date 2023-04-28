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
import UserModel, { UserUpdateHospital, UserUpdateIntern } from "../model/UserModel";

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
  const [preferenceArray, setPreferenceArray] = useState<string[]>(['0']);
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
    setPreferenceArray(res[6])
    
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      console.log('focus')
    try{
      loadUser()
      console.log("LoadUser")
      console.log("LoadUser")
      console.log("LoadUser")
      console.log("LoadUser")
      console.log("LoadUser")
    } catch(err) {
      console.log('fail signup' + err)
    }
    })
    return unsubscribe
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
  const pressHandlerLWatchInterns = async () => {
navigation.navigate('WatchInterns')
  };

  const handleSaveToMongoo = async (label:string, value:string) => {
    const id_ = await AsyncStorage.getItem('id');
    const userUpdateHospital:UserUpdateHospital = {
      id: id_,
      description: label === 'Description' ? value : description,
      city: label === 'City' ? value : city,
      name: label === 'Name' ? value : name,
      phoneNumber: label === 'Phone Number' ? value : phoneNumber,
      email: label === 'Email' ? value : email,
      hospitalQuantity:label === 'Hospital Quantity' ? value : hospitalQuantity,
      preferenceArray:  preferenceArray
    };
    console.log(userUpdateHospital);
    try {
      const res = await UserModel.upadteUserHospital(userUpdateHospital);
      console.log("UpdateUser");
      console.log("update user success");
      // if(label==='Add Partner ID')
      // {
      //   if(LoadPartnerUserload)
      //   {
      //     loadUserPartner(value)
      //   }
      //   const  RealIdMoongoPartner=await loadUserPartner(value)
      //   console.log(`ID OF PARTNER ${RealIdMoongoPartner}}`)
      //   const partner:UserUpdateIntern = {
      //     id: RealIdMoongoPartner,
      //     idIntern: idInternPartner ,
      //     educationalInstitution: institutionPartner,
      //     partnerID: idIntern,
      //     typeOfInternship: specializationPartner,
      //     description: descriptionPartner,
      //     GPA: GPAPartner,
      //     city: cityPartner,
      //     name: namePartner,
      //     phoneNumber:phoneNumberPartner,
      //     email: emailPartner,
      //     avatarUrl:avatarUriPartner,
      //     preferenceArray:  preferenceArrayPartner
      //   };
      //   try{
      //     const res= await UserModel.upadteUserIntern(partner)
      //   }catch (error) {
      //     console.log(error);
      //   }

      // }
    } catch(err) {
      console.log("update user failed " + err);
    }
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
    
  
    const handleSave = async() => {
      setIsEditing(false);
          onChange(tempValue);
          console.log("Handle Save "+ tempValue)
          console.log("Label "+ label);
          await handleSaveToMongoo(label,tempValue)
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
          <AntDesign name="edit" size={24} color="mediumturquoise" />
        </TouchableOpacity>
      </View>
    );
  }
};

  return (
    <View style={styles.rootContainer}>
    <ScrollView>
      <View style={styles.container}>
        
        <Value label="Name" value={name} onChange={setName} />
<Value label="Email" value={email} onChange={setEmail} />
<Value label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />
<Value label="City" value={city} onChange={setCity} />
<Value label="Hospital Quantity" value={hospitalQuantity} onChange={setHospitalQuantity} />
<Value label="Description" value={description} onChange={setDescription} />

<View style={styles.buttonContainer}>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={pressHandlerLWatchInterns}
        
      >
        <Text style={styles.buttonText}>Watch Interns and choose preference</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pressHandlerLogOut}>
      <AntDesign name="logout" size={15} color="black" />
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
      backgroundColor: "aliceblue",
    },
container: {
flex: 1,

alignItems: "center",
justifyContent: "center",
backgroundColor: "aliceblue",
padding: 20,
},

title: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
},
button: {

  borderRadius: 25,
  padding: 7,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
borderWidth:2,
backgroundColor: "mintcream",
      borderColor:'darkturquoise',

marginBottom: 10,
alignSelf:'center',
},
buttonText: {
fontSize: 18,
color:'grey',
fontWeight: "bold",
textAlign: "center",
},
valueContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
  borderWidth: 2,
  borderRadius: 25,
  padding:12,
  borderColor:'mediumturquoise',
  flexWrap: 'wrap'
},
label: {
  alignItems:'center',
  fontSize: 18,
  fontWeight: "bold",
  marginRight: 10,
  alignSelf:'flex-start',
  color:'mediumturquoise'
  
  
  },
  value: {
  fontSize: 18,
  flex:1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginRight: 10,
  alignSelf:'flex-start',
  color:'grey',
  right:0
  
  },
  input: {
  fontSize: 18,
  padding: 5,
  borderRadius: 10,
  marginRight: 10,
  flex: 1,
  },
buttonContainer: {
alignSelf: 'center',
marginHorizontal: 20,
},
buttonsContainer: {
flexDirection: "row",
alignSelf: "baseline",
borderRadius: 100,
},
editButtonContainer: {
position: "absolute",
width: 40,
height: 40,
borderRadius: 25,
backgroundColor: "#f5f5f5",
justifyContent: "center",
alignItems: "center",
right: 10,
bottom: 10,
elevation: 2,
shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
}, 
profilePicture: {
width: 150,
height: 150,
borderRadius: 10,
borderWidth: 3,
borderColor: "black",
},
});

export default HomePageHospital;
