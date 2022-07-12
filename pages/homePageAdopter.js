import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavHeader from '../components/navHeader';

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../firebase';
import TabBarAdopter from '../tabs/homePageAdopterTabs/homeTab/tabBarAdopter';

const HomePageAdopter = ({ navigation }) => {

    // Logout for navheader

    const handleLogOut = () => {
        console.log('clickeao');
        signOut(authentication)
            .then((re) => {
                navigation.navigate("Login");
            })
            .catch(error => alert(error.message))
    }

    const handleNavigateChat = () => {
        navigation.navigate("ChatPage");
    }


    return (
        <View style={styles.homeContainer}>
            <TabBarAdopter />
            <View style={styles.headerContainer}>
                <NavHeader
                    handleCallLogOut={handleLogOut}
                    handleCallToChat={handleNavigateChat}></NavHeader>
            </View>
        </View>


    );

}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,

    },
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
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