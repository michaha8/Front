import { FC } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserDetailsPage from "./components/UserDetailsPage";
import CreatePostPage from "./components/CreatePostPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AllPostsPage from "./components/AllPostsPage";
import SignupPageHospital from "./components/SignupPageHospital";
import SignupPageIntern from "./components/SignupPageIntern";
import forgetPasswordPage from "./components/forgetPassword";
import HomePageHospital from "./components/HomePageHospital";
import HomePageIntern from "./components/HomePageIntern"
import EditHospital from "./components/EditHospital";
import EditIntern from "./components/EditIntern";

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
          options={{ title: "Login" }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignupPage"
          component={SignupPage}
          options={{ title: "Signup" }}
        ></Stack.Screen>
        <Stack.Screen
          name="UserDetailsPage"
          component={UserDetailsPage}
          options={{ title: "User Details" }}
        ></Stack.Screen>
        <Stack.Screen
          name="CreatePostPage"
          component={CreatePostPage}
          options={{ title: "Create Post" }}
        ></Stack.Screen>
        <Stack.Screen
          name="AllPostsPage"
          component={AllPostsPage}
          options={{ title: "All Posts" }}
        ></Stack.Screen>
         <Stack.Screen
          name="SignupPageHospital"
          component={SignupPageHospital}
          options={{ title: "Sign Up As Hospital" }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignupPageIntern"
          component={SignupPageIntern}
          options={{ title: "Sign Up As Intern" }}
        ></Stack.Screen>
        <Stack.Screen
          name="forgetPassword"
          component={forgetPasswordPage}
          options={{ title: "Forget Password" }}
        ></Stack.Screen>
         <Stack.Screen
          name="HomePageIntern"
          component={HomePageIntern}
          options={{ title: "Home page Intern" }}
        ></Stack.Screen>
         <Stack.Screen
          name="HomePageHospital"
          component={HomePageHospital}
          options={{ title: "Home page Hospital" }}
        ></Stack.Screen>
           <Stack.Screen
          name="EditHospital"
          component={EditHospital}
          options={{ title: "Edit Hospital details" }}
        ></Stack.Screen>
           <Stack.Screen
          name="EditIntern"
          component={EditIntern}
          options={{ title: "Edit Intern details" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "green",
    fontWeight: "bold",
    fontSize: 50,
  },
});

export default App;