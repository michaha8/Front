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

} from "react-native";
import UserModel, {Post} from "../model/UserModel";

const PreferenceList: FC<{ navigation: any ,route:any}> = ({ navigation, route }) => {
    const [preferences, setPreferences] = useState(route.params.preferenceArray);

    const onSave = () => {
        console.log(route.params.userType)
        console.log(route.params)
         navigation.navigate(`HomePage${route.params.userType}`)

    };
  
   
  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Your preferences:</Text>
          {preferences.map((preference, index) => (
            <View key={index} style={styles.preferenceRow}>
              <View style={styles.preferenceLabelContainer}>
                <Text style={styles.preferenceLabel}>Preference {index + 1}: </Text>
              </View>
              <View style={styles.preferenceValueContainer}>
                <Text style={styles.preferenceValue}>{preference}</Text>
              </View>
            </View>
          ))}
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
            <Text style={styles.buttonText}>Change preferences</Text>
          </TouchableOpacity>
          </View>
        </View>
      );
          };      
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
      }, buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      preferenceTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      },
     
      preferenceContainer: {
        flex: 1,
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
      button: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
      },
      buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
      },preferenceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      preferenceLabelContainer: {
        marginRight: 8,
      },
      preferenceLabel: {
        fontWeight: 'bold',
      },
      preferenceValueContainer: {
        flex: 1,
      },
      preferenceValue: {
        fontSize: 18,
      },
    });
    
    export default PreferenceList;