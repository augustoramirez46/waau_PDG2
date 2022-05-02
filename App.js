//React - Expo dependencies
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

// Navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Pages
import HomePageAdopter from "./pages/homePageAdopter";
import HoomePageVolunteer from "./pages/homePageVolunteer";
import LoginPage from "./pages/loginPage";
import FormPage from "./pages/formPage";
import RegisterPage from "./pages/registerPage";


// Firebase


// From the example
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';




export default function App() {
  return (
    <NavigationContainer
      style={styles.container}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Navigator initialRouteName="HomeVolunteer">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
        <Stack.Screen name="Register" options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: "Registro" }} component={RegisterPage} />
        <Stack.Screen name="Form" options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: "Formulario" }} component={FormPage} />
        <Stack.Screen name="HomeAdopter" options={{ headerShown: false }} component={HomePageAdopter} />
        <Stack.Screen name="HomeVolunteer" options={{ headerShown: false }} component={HoomePageVolunteer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
