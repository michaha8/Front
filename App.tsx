import React,{ FC } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginPage from "./components/LoginPage";
import CreatePostPage from "./components/CreatePostPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WatchHospitalsPage from "./components/WatchHospitalsPage";
import SignupPageHospital from "./components/SignupPageHospital";
import SignupPageIntern from "./components/SignupPageIntern";
import forgetPasswordPage from "./components/forgetPassword";
import HomePageHospital from "./components/HomePageHospital";
import HomePageIntern from "./components/HomePageIntern"
import AdminHomePage from "./components/AdminHomePage";
import PreferenceList from "./components/PreferenceListPage";
import WatchInternsPage from "./components/WatcInternsPage";
import MatchingPage from "./components/MatchingPage";

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const clickHandler = () => {
    alert("Clicked");
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: "Apply to all" }}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: "Login",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
      <Stack.Screen
          name="PreferenceListPage"
          component={PreferenceList}
          options={{ title: "Preference List" }}
        ></Stack.Screen>
        <Stack.Screen
          name="CreatePostPage"
          component={CreatePostPage}
          options={{ title: "Create Post" }}
        ></Stack.Screen>
          <Stack.Screen
          name="AdminHomePage"
          component={AdminHomePage}
          options={{ title: "Admin home page" ,headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
        <Stack.Screen
          name="WatchHospitals"
          component={WatchHospitalsPage}
          options={{ title: "Watch Hospitals", headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
         <Stack.Screen
          name="SignupPageHospital"
          component={SignupPageHospital}
          options={{ title: "Sign Up As Hospital",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignupPageIntern"
          component={SignupPageIntern}
          options={{ title: "Sign Up As Intern",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
        <Stack.Screen
          name="forgetPassword"
          component={forgetPasswordPage}
          options={{ title: "Forget Password",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
         <Stack.Screen
          name="HomePageIntern"
          component={HomePageIntern}
          options={{ title: "Home page Intern",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
         <Stack.Screen
          name="HomePageHospital"
          component={HomePageHospital}
          options={{ title: "Home page Hospital",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color,}}
        ></Stack.Screen>
          <Stack.Screen
          name="WatchInterns"
          component={WatchInternsPage}
          options={{ title: "Watch Interns And Choose Preference",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
          <Stack.Screen
          name="MatchingPage"
          component={MatchingPage}
          options={{ title: "Youre Matching",headerTitleStyle: styles.headerTitle ,headerStyle:styles.header,headerTintColor: styles.headerTintColor.color, }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },  headerTitle: {
    color: 'lightslategrey',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'aliceblue',
  },
  textStyle: {
    color: "green",
    fontWeight: "bold",
   
    fontSize: 50,
  },headerTintColor: {
    color: 'lightsteelblue',

  },
});

export default App;