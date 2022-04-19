import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';

const registerExtraDataPage = ({ navigation }) => {

    // Empty json to be pushed with the form info

    const [userInfo, setUserInfo] = useState({
        userName: '',
        userAge: '',
        userDir: '',
        userPhoneNumber: '',

    })

    useEffect(() => {
        handleFetchUID().then((reference) => {

        })

    })

    // Fetch UID route

    const handleFetchUID = () => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            const userUID = getAuth().currentUser.uid;
            const reference = ref(db, '/users/' + userUID + '/userInfo/');

            resolve(reference);
        }).catch((error) => {
            console.error(error);
        });
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default registerExtraDataPage;