import { AntDesign } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
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
import UserModel, { UserUpdateIntern } from "../model/UserModel";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const HomePageIntern: FC<{ navigation: any }> = ({ navigation }) => {
  const [avatarUri, setAvatrUri] = useState("https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const[idIntern,setIDIntern]=useState<string>("");
  const[institution,setInstitution]=useState<string>("");
  const[specialization,setSpecialization]=useState<string>("")
  const[phoneNumber,setPhoneNuber]=useState<string>("")
  const[GPA,setGPA]=useState<string>("")
  const[city,setCity]=useState<string>("")
  const[partnerID,setPartnerID]=useState<string>("")
  var UriAfretChange = ""
  const[description,setDescription]=useState<string>(``)




  const loadUser = async ()=>{
    const id = await AsyncStorage.getItem('id')
    const res = await UserModel.getUserById(id)
    setName(res[0])
    setCity(res[1])
    setEmail(res[2])
    setDescription(res[3])
    setGPA(res[4])
    setPhoneNuber(res[5])
    setAvatrUri(res[6])
    setInstitution(res[7])
    setIDIntern(res[11])
    setPartnerID(res[9])
    setSpecialization(res[10])
    
    
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
  const handleEditPicture = async () => {
    let result: any;
    await handleTakePhoto()
    try {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setAvatrUri(result.uri);
        const id_ = await AsyncStorage.getItem('id')
        const up : UserUpdateIntern = {
          id: id_,
          idIntern:idIntern,
          educationalInstitution:institution,
          partnerID:partnerID,
          typeOfInternship:specialization,
          description:description,
          phoneNumber:phoneNumber,
          GPA:GPA,
          city:city,
          name: name,
          email:email,
          avatarUrl: result.uri
        }
        try{
          const res = await UserModel.upadteUserIntern(up)
          console.log("update user success")
        } catch(err){
          console.log("update user failed " + err)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
 

 const handleTakePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      console.log('Camera permission not granted');
      return;
    }
  
    try {
      console.log('open camera');
      const res = await ImagePicker.launchCameraAsync();
      if (!res.cancelled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        UriAfretChange = uri;
        console.log('while: ' + uri);
        console.log('while: ' + UriAfretChange);
        setAvatrUri(uri);
        console.log('while pp: ' + avatarUri);
      }
    } catch (err) {
      console.log('open camera error' + err);
    }
  };

  const handleSaveToMongoo = async () => {
    const id_ = await AsyncStorage.getItem('id')
    const up : UserUpdateIntern = {
      id: id_,
          idIntern:idIntern,
          educationalInstitution:institution,
          partnerID:partnerID,
          typeOfInternship:specialization,
          description:description,
          GPA:GPA,
          city:city,
          name: name,
          phoneNumber:phoneNumber,
          email:email,
          avatarUrl: avatarUri
    }
    console.log(up)
    try{
      const res = await UserModel.upadteUserIntern(up)
      console.log("update user success")
    } catch(err){
      console.log("update user failed " + err)
    }
  };
 
    
      const handleWatchHospitals = () => {
        
    navigation.navigate('AllPostsPage')

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
        
      
        const handleSave = async () => {
          setIsEditing(false);
          onChange(tempValue);
          console.log("Handle Save")
          const res =await handleSaveToMongoo()
          console.log(res)

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
      <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
          <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: avatarUri }} />
        <View style={styles.editButtonContainer}>
          <TouchableOpacity onPress={handleEditPicture}>
            <AntDesign name="picture" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </View>
     <Value label="Name" value={name} onChange={setName} />
    <Value label="Email" value={email} onChange={setEmail} />
    <Value label="Password" value={password} onChange={setPassword} />
    <Value label="Phone Number" value={phoneNumber} onChange={setPhoneNuber} />
    <Value label="City" value={city} onChange={setCity} />
    <Value label="ID" value={idIntern} onChange={setIDIntern} />
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
            onPress={handleWatchHospitals}
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
    }, profilePicture1: {
      width: 110,
      height: 110,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: "black",
    },  editButtonContainer1: {
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
        borderWidth: 2,
        borderRadius: 10,
        padding:12,
        borderColor:'black',
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

export default HomePageIntern