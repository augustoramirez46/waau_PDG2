//React - Expo dependencies
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

// Navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//Pages
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";

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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomePage} />
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
