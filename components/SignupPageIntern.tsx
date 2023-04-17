import React from "react";
import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AuthModel, { UserIntern } from "../model/AuthModel";
import * as ImagePicker from 'expo-image-picker';

const SignupPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [avatarUri, setAvatrUri] = useState("https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg?w=2000")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const[idIntern,setIDIntern]=useState<string>("");
  const[institution,setInstitution]=useState<string>("");
  const[specialization,setSpecialization]=useState<string>("")
  const[phoneNumber,setPhoneNuber]=useState<string>("")
  const[GPA,setGPA]=useState<string>("")
  const[city,setCity]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[partnerID,setPartnerID]=useState<string>("None")
  const [preferenceArray, setPreferenceArray] = useState<string[]>([]);



  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleChoosePhoto = async () => {
    try{
      const res = await ImagePicker.launchImageLibraryAsync()
      if(!res.canceled && res.assets.length > 0){
        const uri = res.assets[0].uri;
        setAvatrUri(uri)
      }
    }catch(err){
      console.log("open camera error" + err)
    }
  };

  const handleTakePhoto = async () => {
    try{
      const res = await ImagePicker.launchCameraAsync()
      if(!res.canceled && res.assets.length > 0){
        const uri = res.assets[0].uri;
        setAvatrUri(uri)
      }
    }catch(err){
      console.log("open camera error" + err)
    }
  };

  const pressHandlerSignUp = async () => {
    alert("Hi " + name + " Welcome to the app , please log in");
    const user: UserIntern = {
      email: email,
      name: name,
      password: password,
      avatarUrl: avatarUri,
      idIntern:idIntern,
      institution:institution,
      description:description,
      GPA:GPA,
      city:city, 
      specialization:specialization,
      phoneNumber:phoneNumber,
      partnerID:partnerID,
      userType:'intern',
      preferenceArray:preferenceArray

    }
    try{
      await AuthModel.registerIntern(user)
      console.log('success signup signuppage')
    } catch(err) {
      console.log('fail signup' + err)
    }
    // navigation.goBack()
  };

  const onConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text === password);
  };
  const pressHandlerGoBack = () => {
    navigation.goBack()
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <View style={styles.imageContainer}>
          {avatarUri && <Image source={{uri:avatarUri}} style={styles.image} />}
          {!avatarUri && <Text style={styles.choosePhotoText}>Choose Photo</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTakePhoto}>
        <Text style={styles.takePhotoText}>Take Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setIDIntern}
        placeholder="ID"
        value={idIntern}
      />
       <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="name"
        value={name}
      />
        <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="email"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="password"
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.input, !passwordsMatch ? styles.inputError : null]}
        onChangeText={onConfirmPasswordChange}
        placeholder="confirm password"
        value={confirmPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setInstitution}
        placeholder="Institution"
        value={institution}
      />
      <TextInput
        style={styles.input}
        onChangeText={setSpecialization}
        placeholder="Specialization"
        value={specialization}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNuber}
        placeholder="Phone Number"
        value={phoneNumber}
      />
      <TextInput
        style={styles.input}
        onChangeText={setGPA}
        placeholder="GPA"
        value={GPA}
      />
      <TextInput
        style={styles.input}
        onChangeText={setCity}
        placeholder="City"
        value={city}
      />
     <TextInput
        style={styles.inputDescription}
        onChangeText={setDescription}
        placeholder="Description -
              Add Some Information about you."
        value={description}
        multiline={true}
        numberOfLines={4}
        maxLength={200}>
      </TextInput>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pressHandlerSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pressHandlerGoBack}>
          <Text style={styles.buttonText}>Cancle</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 10,
    borderWidth: 2,
    borderColor:'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputDescription: {
    height: 80,
    margin: 10,
    borderWidth: 2,
    borderColor:'black',
    padding: 10,
    paddingTop: 0,
    borderRadius: 10,
    marginTop: 5,

  },
  inputError: {
    borderColor: "red",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
  },
});

export default SignupPage;
