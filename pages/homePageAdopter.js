import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavHeader from '../components/navHeader';

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../firebase';



const HomePageAdopter = ({ navigation }) => {

    const handleNavigateForm = () => {
        navigation.navigate("Form");
    }

    const handleNavigateChat = () => {
        navigation.navigate("ChatPage");
    }

    // Logout for navheader

    const handleLogOut = () => {
        signOut(authentication)
            .then((re) => {
                navigation.navigate("Login");
            })
            .catch(error => alert(error.message))
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <NavHeader handleCallLogOut={handleLogOut}></NavHeader>
            </View>

            <View style={styles.container}>
                <Text>Adoptante</Text>
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
            </View></>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%'
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16

    },
});
export default HomePageAdopter;