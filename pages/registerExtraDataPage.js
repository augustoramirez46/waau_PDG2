import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';

import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const RegisterExtraDataPage = ({ navigation }) => {

    // Empty json to be pushed with the form info

    const [userInfo, setUserInfo] = useState({
        userName: '',
        userAge: '',
        userDir: '',
        userPhoneNumber: '',

    });
    const [userInfoRoute, setUserInfoRoute] = useState(false);
    const calledOnce = useRef(false);

    useEffect(() => {
        if (calledOnce.current) return;

        handleFetchUID().then((reference) => {
            setUserInfoRoute(reference);
            console.log(userInfoRoute);
        })
        calledOnce.current = true;
    });

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

    // Check and submit form

    const handleSubmitData = () => {
        if (userInfo.userAge != '', userInfo.userDir != '', userInfo.userName != '', userInfo.userPhoneNumber != '') {
            set(userInfoRoute, {
                userInfo
            })
            navigation.navigate
        } else {
            createOneButtonAlert();
        }
    }

    // Alert 

    const createOneButtonAlert = () =>
        Alert.alert(
            "Datos incompletos",
            "Porfavor llena todos los campos designados",
            [
                { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
        );

    return (
        <SafeAreaView contentContainerStyle={{ paddingTop: StatusBar.currentHeight + 50, paddingLeft: 30, paddingRight: 30 }}>
            <View>
                <Text>Antes de continuar, necesitamos unos pocos datos más</Text>
                <KeyboardAvoidingView>
                    <Text>¿Cuál es tu edad?</Text>
                    <TextInput
                        placeholder='Escribe aqui'
                        value={userInfo.userAge}
                        onChangeText={text => setUserInfo(userInfo.userAge, text)}
                        keyboardType={'numeric'}
                    >
                    </TextInput>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView>
                    <Text>¿Cuál es tu dirección?</Text>
                    <TextInput
                        placeholder='Escribe aqui'
                        value={userInfo.userDir}
                        onChangeText={text => setUserInfo(userInfo.userDir, text)}
                        keyboardType={'default'}
                    >
                    </TextInput>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView>
                    <Text>¿Cuál es tu nombre completo?</Text>
                    <TextInput
                        placeholder='Escribe aqui'
                        value={userInfo.userName}
                        onChangeText={text => setUserInfo(userInfo.userName, text)}
                        keyboardType={'default'}
                    >
                    </TextInput>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView>
                    <Text>¿Cuál es tu número de celular?</Text>
                    <TextInput
                        placeholder='Escribe aqui'
                        value={userInfo.userPhoneNumber}
                        onChangeText={text => setUserInfo(userInfo.userPhoneNumber, text)}
                        keyboardType={'numeric'}
                    >
                    </TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() => { handleSubmitData() }}
                    style={styles.button}
                >
                    <Text>Siguiente</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingTop: 100
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'

    },
});
export default RegisterExtraDataPage;