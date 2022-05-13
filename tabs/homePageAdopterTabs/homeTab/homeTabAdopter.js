import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import { Fonts, FontsSizes } from "../../../config/useFonts.js";


const HomeTabAdopter = ({ navigation }) => {

    const handleNavigateForm = () => {
        navigation.navigate("Form");
    }

    const handleNavigateChat = () => {
        navigation.navigate("ChatPage");
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Adoptante</Text>
            <TouchableOpacity
                onPress={handleNavigateForm}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Ir al formulario</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleNavigateChat}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Ir al chat</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        color: 'gray'
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'

    },
    buttonText: {
        color: 'white',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,

    },
});

export default HomeTabAdopter