import { AntDesign } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import ReadMore from 'react-native-read-more-text';
import AuthModel from "../model/AuthModel";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import UserModel, { UserUpdate } from "../model/UserModel";
import * as ImagePicker from 'expo-image-picker';


const HomePageIntern: FC<{ navigation: any }> = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg?w=2000"
  );
 
  const [avatarUri, setAvatrUri] = useState("")
  const [email, setEmail] = useState<string>("Intern@Gmail.com");
  const [password, setPassword] = useState<string>("InternPassword");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("Intern");
  const[id,setID]=useState<string>("123123123");
  const[institution,setInstitution]=useState<string>("SCE");
  const[specialization,setSpecialization]=useState<string>("cardio")
  const[phoneNumber,setPhoneNuber]=useState<string>("0525513098")
  const[GPA,setGPA]=useState<string>("85")
  const[city,setCity]=useState<string>("Holon")
  var UriAfretChange = ""
  const[description,setDescription]=useState<string>(`Im intern my GPA is ${GPA}, live in ${city}, my 
  speclization in ${specialization}.......................................................`)

  const handleEditPicture = async () => {
    console.log("before: " + profilePicture)
    await handleTakePhoto()
    console.log("after: " +profilePicture)
    const id_ = await AsyncStorage.getItem('id')
    const up : UserUpdate = {
      id: id_,
      name: fullName,
      avatarUrl: UriAfretChange
    }
    try{
      const res = await UserModel.upadteUser(up)
      console.log("update user success")
    } catch(err){
      console.log("update user failed " + err)
    }
  };
  
  const handleTakePhoto = async () => {
    try{
      const res = await ImagePicker.launchCameraAsync()
      if(!res.canceled && res.assets.length > 0){
        const uri = res.assets[0].uri;
        UriAfretChange = uri
        console.log("while: " + uri)
        console.log("while: " + UriAfretChange)
        setProfilePicture(uri)
        console.log("while pp: " + profilePicture)
      }
    }catch(err){
      console.log("open camera error" + err)
    }
  };
  async function clearStorage() {
    await AsyncStorage.clear();
  }


    const handleEditDetails = () => {
        // navigate to edit details screen
        navigation.navigate('EditDetailsScreen');
      }
    
      const handleWatchHospitals = () => {
        // navigate to watch hospitals screen
        navigation.navigate('WatchHospitalsScreen');
      }
      const handleLogOut = () => {
        // navigate to watch hospitals screen
        navigation.navigate('LoginPage');
      }
    
      const handleAddPartner = () => {
        // navigate to add partner screen
        navigation.navigate('AddPartnerScreen');
      }
    
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
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
      <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
          <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: profilePicture }} />
        <View style={styles.editButtonContainer}>
          <TouchableOpacity onPress={handleEditPicture}>
            <AntDesign name="picture" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
     <Value label="Name" value={name} onChange={setName} />
    <Value label="Email" value={email} onChange={setEmail} />
    <Value label="Password" value={password} onChange={setPassword} />
    <Value label="Phone Number" value={phoneNumber} onChange={setPhoneNuber} />
    <Value label="City" value={city} onChange={setCity} />
    <Value label="ID" value={id} onChange={setID} />
    <Value label="institution" value={institution} onChange={setInstitution} />
    <Value label="specialization" value={specialization} onChange={setSpecialization} />
    <Value label="GPA" value={GPA} onChange={setGPA} />
    <Value label="Description" value={description} onChange={setDescription} />
    <TouchableOpacity onPress={handleAddPartner}>
      <Text style={{alignSelf:'flex-start'}}>Add Partner
            <AntDesign name="adduser" size={24} color="black" />
            </Text>
          </TouchableOpacity>
    <View style={styles.buttonContainer}>
        </View>
        <View style={styles.buttonContainer}>
       
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AuthModel.logout();
              navigation.replace("Auth");
            }}
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
    profilePictureContainer: {
      marginVertical: 20,
    }, profilePicture: {
      width: 110,
      height: 110,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: "black",
    },  editButtonContainer: {
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
    buttonsContainer: {
      flexDirection: "row",
      alignSelf: "baseline",
      borderRadius: 100,
    },
    });

export default HomePageIntern