import { AntDesign } from "@expo/vector-icons";
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
  StatusBar,

} from "react-native";
import UserModel, {Post} from "../model/UserModel";

const PreferenceListForHomePage: FC<{ navigation: any ,route:any}> = ({ navigation, route }) => {
    const [preferences, setPreferences] = useState(route.params.preferenceArray);

    const onSave = () => {
        console.log(route.params.userType)
        console.log(route.params)
       
        if(route.params.userType==='Intern'){
          console.log("im ?HERE")
          navigation.replace('WatchHospitals')
        }
        else if(route.params.userType==='Hospital'){
          navigation.replace(`WatchInterns`)
         }
         else{
          navigation.goBack();
         }

    };
  
  
   
  
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Your preferences:</Text>
          {preferences.map((preference, index) => (
            <View key={index} style={styles.preferenceRow}>
              <View style={styles.preferenceContainer}>
              <View style={styles.preferenceLabelContainer}>
                <Text style={styles.preferenceLabel}>Preference {index + 1}: </Text>
              </View>
              <View style={styles.preferenceContainer}>
                <Text style={styles.preferenceValue}>{preference}</Text>
              </View>
              </View>
             </View>
          ))}
          <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Change Preference</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      );
          };      
    
          const styles = StyleSheet.create({
            container: {
              marginTop: StatusBar.currentHeight,
              flex: 1,
              flexDirection:'column',
              justifyContent: 'space-between',
              alignItems:'center',
              backgroundColor: "aliceblue",
              paddingBottom: 20
          },
            preferenceTextContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 8,
            },
            title: {
              top:10,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 25,
            },
           
            preferenceContainer: {
              alignSelf:'center',alignItems:'center',padding:10,
            },
            preferenceText: {
              fontSize: 18,
              alignSelf:'center'
            },
            preferenceInput: {
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 4,
              marginTop: 8,
            },
            buttonsContainer: {
              flexDirection: "row",
              
              justifyContent: 'center', // Centers the buttons horizontally
              marginBottom: 10, // Adds some spacing at the bottom
            },
            button: {
              flex: 1,
              margin: 10,
              alignItems: "center",
              backgroundColor: "mintcream",
              borderColor:'darkturquoise',
              borderWidth:2,
              padding: 5,
              borderRadius: 10,
            },
            buttonText: {
              padding: 10,
            },preferenceRow: {
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              justifyContent: 'center',
            },
            preferenceLabelContainer: {
              
              padding:10,
            },
            preferenceLabel: {
              fontWeight: 'bold',
              alignSelf:'center',
            },
            preferenceValueContainer: {
              flex: 1,
            },
            preferenceValue: {
              fontSize: 18,
            },
          });
    
    export default PreferenceListForHomePage;