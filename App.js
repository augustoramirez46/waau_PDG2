import 'react-native-gesture-handler';

//React - Expo dependencies
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

// Navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Pages
import HomePageAdopter from "./pages/homePageAdopter";
import HomePageVolunteer from "./pages/homePageVolunteer";
import LoginPage from "./pages/loginPage";
import FormPage from "./pages/formPage";
import RegisterPage from "./pages/registerPage";
import ChatPage from './pages/chatPage';

// Ignore logs
import { LogBox } from "react-native";
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);


// From the example
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';


export default function App() {

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer
      style={styles.container}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
        <Stack.Screen name="Register" options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: "Registro" }} component={RegisterPage} />
        <Stack.Screen name="Form" options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: "Formulario" }} component={FormPage} />
        <Stack.Screen name="HomeAdopter" options={{ headerShown: false }} component={HomePageAdopter} />
        <Stack.Screen name="HomeVolunteer" options={{ headerShown: false }} component={HomePageVolunteer} />
        <Stack.Screen name="ChatPage" options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: "Chat" }} component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7B36',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
