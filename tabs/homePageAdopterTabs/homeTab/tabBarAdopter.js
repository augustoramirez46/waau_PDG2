import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import VideoTabCourse from './videoTabCourse';
import HomeTabAdopter from './homeTabAdopter';

import { Ionicons } from '@expo/vector-icons';

// Styles
import { Fonts, FontsSizes } from "../../../config/useFonts.js";

const Tab = createBottomTabNavigator();

const TabBarAdopter = ({ navigation }) => {

    return (
        <Tab.Navigator
            initialRouteName='AdopterHomePageTab'
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: '#FF7B36'
            }}
            backBehavior='order'

        >
            <Tab.Screen
                name="AdopterHomePageTab"
                component={HomeTabAdopter}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name="home"
                            color={focused ? "#FF7B36" : "gray"}
                            size={25}
                        />
                    ),
                    headerStatusBarHeight: 60,

                    tabBarLabelStyle: {
                        fontFamily: Fonts.Poppins.Regular,
                        fontSize: 12,
                        color: 'gray'

                    },

                }}
            />
            <Tab.Screen
                name="VideoTab"
                component={VideoTabCourse}
                options={{
                    tabBarLabel: 'Curso',
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name="videocam"
                            color={focused ? "#FF7B36" : "gray"}
                            size={25}
                        />
                    ),
                    headerStatusBarHeight: 60,

                    tabBarLabelStyle: {
                        fontFamily: Fonts.Poppins.Regular,
                        fontSize: 12,
                        color: 'gray'

                    },

                }}
            />
        </Tab.Navigator>
    )
}

export default TabBarAdopter

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'black'
    }
})
