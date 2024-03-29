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
  Alert,
  ActivityIndicator,
} from "react-native";
import ReadMore from 'react-native-read-more-text';
import AuthModel from "../model/AuthModel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import UserModel, { UserUpdateIntern } from "../model/UserModel";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { newIP } from "../constants";
const HomePageIntern: FC<{ navigation: any }> = ({ navigation }) => {
  const [avatarUri, setAvatrUri] = useState("../assets/male-doctor-with-stethoscope-avatar-vector-31657832.jpg")
 
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const[idIntern,setIDIntern]=useState<string>("");
  const[institution,setInstitution]=useState<string>("");
  const[specialization,setSpecialization]=useState<string>("")
  const[phoneNumber,setPhoneNuber]=useState<string>("")
  const[GPA,setGPA]=useState<string>("")
  const[city,setCity]=useState<string>("")
  const[matching,setMatching]=useState<string>("")
  const[partnerID,setPartnerID]=useState<string>("")
  var UriAfretChange = ""
  const[description,setDescription]=useState<string>(``)
  const[userType,setUserType]=useState<string>(``)
  const [preferenceArray, setPreferenceArray] = useState<string[]>(['0']);
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchHospitals = () => {
    navigation.navigate('WatchHospitals')}
      
   

  const loadUser = async ()=>{
    setIsLoading(true)
    const id = await AsyncStorage.getItem('id')
    const res = await UserModel.getUserById(id)
    setName(res[0])
    setCity(res[1])
    setEmail(res[2])
    setDescription(res[3])
    setGPA(res[4])
    setPhoneNuber(res[5])

    setAvatrUri(res[6]);    
    setInstitution(res[7])
    setPartnerID(res[9])
    setSpecialization(res[10])
    setIDIntern(res[11])
    setPreferenceArray(res[12])
    setUserType(res[13])
    setMatching(res[14])
    console.log(res[14])
    if(res[14].length!=0){
      navigation.replace("MatchingPage",{matching: res[14]});
    }
    setIsLoading(false)
 
    
    
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setIsLoading(true);

      try {
        await loadUser();
      } catch(err) {
        console.log('fail signup' + err)
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe
  }, []);
  const pressHandlerLogOut = async () => {
    console.log("Logging out...");
    
    // Clear storage
    try {
      await AsyncStorage.clear();
      console.log("Storage cleared successfully.");
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
    
    // Reset navigation stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  };
  const pressHandlerSeePreferenceList=()=>{
    navigation.navigate('PreferenceListForHomePage', { preferenceArray: preferenceArray,userType:'Intern' });
  
  }

  const handleEditPicture = async () => {
    let result: any;
    try {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result)
      console.log(`result.canceled ${result.canceled}`)
      if (result.canceled !== true) {
        setAvatrUri(result.assets[0].uri);
        const id_ = await AsyncStorage.getItem('id');
        console.log("uploading image")
        const url = await UserModel.uploadImage(result.assets[0].uri)
        console.log("got url from upload: " + url)
        const up: UserUpdateIntern = {
          id: id_,
          idIntern: idIntern,
          educationalInstitution: institution,
          partnerID: partnerID,
          typeOfInternship: specialization,
          description: description,
          phoneNumber: phoneNumber,
          GPA: GPA,
          city: city,
          name: name,
          userType:'intern',
          email: email,
          avatarUrl: url,
          preferenceArray: preferenceArray,
        };
        try {
          const res = await UserModel.upadteUserIntern(up);
          console.log("UpdateUser");
          console.log(up);
          console.log("update user success");
          
        } catch (err) {
          console.log("update user failed " + err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


 

 
  const handleSaveToMongoo = async (label:string, value:string) => {
    if(label==='Add Partner ID'){
      try{
       const checkIfExsitInDB=await UserModel.getUserByIdIntern(value)
       if(!checkIfExsitInDB)
       {
        Alert.alert(
          'Invalid input',
          'The ID number you entered does not exist in the system.\nAfter your partner registration, try again.',
        );
        return
       }
      }
    catch(err){
      Alert.alert(`Error ${err}`)
    }
    
    }



    if(label==='GPA'){
      try{
     const GoodGPA= handleGPAChange(value)
     if(!GoodGPA){
     Alert.alert(
      'Invalid input GPA',
    );
    return
     }
  }
      catch(err){
        Alert.alert(`Error ${err}`)
      }
    }
    const id_ = await AsyncStorage.getItem('id');
    const userUpdateIntern:UserUpdateIntern = {
      id: id_,
      idIntern: label === 'ID' ? value :idIntern ,
      educationalInstitution: label === 'institution' ? value : institution,
      partnerID: label === 'Partner ID' ? value : partnerID,
      typeOfInternship: label === 'specialization' ? value : specialization,
      description: label === 'Description' ? value : description,
      GPA: label === 'GPA' ? value : GPA,
      city: label === 'City' ? value : city,
      name: label === 'Name' ? value : name,
      phoneNumber: label === 'Phone Number' ? value : phoneNumber,
      email: label === 'Email' ? value : email,
      avatarUrl: label === 'avatarUri' ? value : avatarUri,
      userType:userType,
      preferenceArray:  preferenceArray
    };
    console.log(userUpdateIntern);
    try {
      const res = await UserModel.upadteUserIntern(userUpdateIntern);
      console.log("UpdateUser");
      console.log("update user success");
    } catch(err) {
      console.log("update user failed " + err);
    }
  };

  const handleGPAChange = (text) => {
    // Convert the entered value to a number
    const enteredGPA = Number(text);

    // Check if the enteredGPA is within the valid range
    if (enteredGPA >= 0 && enteredGPA <= 100) {
      setGPA(text); // Update the state if the value is valid
      return true
    }
    return false
  };
      interface ValueProps {
        label: string;
        value: string;
        onChange: (value: string) => void;
        editable: boolean; // Add editable prop
      }
  
      const Value: FC<ValueProps> = ({ label, value, onChange ,editable}) => {
        const [isEditing, setIsEditing] = useState(false);
        const [tempValue, setTempValue] = useState(value);
        
      
        const handleSave = async () => {
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
              {editable ? ( // Check if the value is editable
          <TextInput
            style={[styles.input]}
            multiline={label === 'Description'}
            numberOfLines={label === 'Description' ? 4 : 1}
            value={tempValue}
            onChangeText={setTempValue}
          />
        ) : (
          // Render non-editable value
          <Text style={styles.value}>{value}</Text>
        )}
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
          {editable ? ( // Check if the value is editable
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
            >
              <Text numberOfLines={isEditing ? 10 : 3} style={styles.value}>
                {value}
              </Text>
            </ReadMore>
          ) : (
            // Render non-editable value
            <Text style={styles.value}>{value}</Text>
          )}
        </View>
        {editable && ( // Render the edit button only if the value is editable
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <AntDesign name="edit" size={24} color="mediumturquoise" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
};
    if (isLoading) {
      // show loading icon
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black"/>
        </View>
      );
    }
      return (
       
        <ScrollView>
          <View style={styles.container}>
          <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: newIP+avatarUri}} />
        <View style={styles.editButtonContainer}>
          <TouchableOpacity onPress={handleEditPicture}>
            <AntDesign name="picture" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Value label="ID" value={idIntern} onChange={setIDIntern}editable={false} />
      <Value label="Email" value={email.toLowerCase()} onChange={setEmail} editable={false}/>
     <Value label="Name" value={name} onChange={setName} editable={true} />
    <Value label="Phone Number" value={phoneNumber} onChange={setPhoneNuber}editable={true} />
    <Value label="City" value={city} onChange={setCity}editable={true}/>
    <Value label="institution" value={institution} onChange={setInstitution}editable={true} />
    <Value label="specialization" value={specialization} onChange={setSpecialization}editable={true} />
    <Value label="GPA" value={GPA} onChange={setGPA}editable={true} />
    <Value label="Partner ID" value={partnerID} onChange={setPartnerID} editable={true}/>
    <Value label="Description" value={description} onChange={setDescription}editable={true} />
 
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            // style={styles.button}
            onPress={pressHandlerSeePreferenceList}
          >
           <Text style={{fontSize: 18, color:'grey',fontWeight: "bold",textAlign: "center",}}>Watch preference</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleWatchHospitals}
          >
            <Text style={styles.buttonText}>Watch Hospitals and choose preference</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pressHandlerLogOut}>
      <AntDesign name="logout" size={16} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    );
    };
    
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "aliceblue",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    },loadingContainer: {
      flex: 1,
      backgroundColor: "aliceblue",
      justifyContent: "center",
      alignItems: "center",
    },
    profilePictureContainer: {
      alignSelf:'center',
      marginVertical: 15,
    }, 
    button: {
        padding: 7,
      borderRadius: 12,
      // borderStyle:'dotted',
      // borderColor:'blue',
      // borderBottomWidth:10,
      marginVertical: 10, // add margin between each card
      
      backgroundColor: "mintcream",
      borderColor:'darkturquoise',
      borderWidth:2,
      marginBottom: 0,
      alignSelf:'center',
      },
    buttonText: {
    fontSize: 18,
    color:'grey',
    padding: 10,
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
      borderRadius: 70,
      borderWidth: 2,
      borderColor:'mediumturquoise',
    },
    });

export default HomePageIntern