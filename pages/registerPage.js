import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { StatusBar } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';

import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase';

const RegisterPage = ({ navigation }) => {

    // Auth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    // userInfo
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userDir, setUserDir] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    // Alert 

    const createOneButtonAlert = () =>
        Alert.alert(
            "Datos incompletos",
            "Porfavor llena todos los campos designados",
            [
                { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
        );

    // User type & extra data submission to database

    const handleUserSubmission = () => {

        const db = getDatabase();
        const userUID = getAuth().currentUser.uid;
        const reference = ref(db, '/users/' + userUID);

        set(reference, {
            userType,
            userName,
            userAge,
            userDir,
            userPhoneNumber,
            email,
        });

        const referenceStatus = ref(db, '/users/' + userUID + '/responses/');

        set(referenceStatus, {
            status: 'pending',
        });

    }

    // Signup

    const handleSignUp = () => {
        if (
            userType == '' ||
            userAge == '' ||
            userDir == '' ||
            userName == '' ||
            userPhoneNumber == '' ||
            email == '' ||
            password == ''
        ) {
            createOneButtonAlert();
            return;
        }
        createUserWithEmailAndPassword(authentication, email, password)
            .then((re) => {
                // Submit user type
                handleUserSubmission()
                setIsSignedIn(true);

                console.log(re);
            })
            .catch(error => alert(error.message))
    }

    // Login effect

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(authentication, user => {
            if (user && isSignedIn) {

                switch (userType) {
                    //TODO:Change to "HomeAdopter"
                    case 'adopter':
                        navigation.navigate("HomeAdopter");
                        console.log("desdelNavigate");
                        break;

                    case 'volunteer':
                        navigation.navigate("HomeVolunteer");
                        console.log("desdelNavigate");
                        break;

                    default:
                        break;
                }
            }
        })

        return unsuscribe
    })

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
        >
            <View
                style={styles.subContainer}
                behavior="padding"
            >
                <Image style={styles.registerLogo} source={require('../resources/img/icon_transp.png')} />
                <Text style={styles.buttonContainerUser__title}>Yo soy:</Text>

                <View
                    style={styles.buttonContainerUser}
                >

                    <TouchableOpacity
                        onPress={() => { setUserType('adopter') }}
                        style={[styles.buttonUser, userType == 'adopter' ? styles.buttonUserSelected : styles.buttonUser]}
                    >
                        <Text
                            style={[styles.buttonUserText, userType == 'adopter' ? styles.buttonUserTextSelected : styles.buttonUserText]}
                        >Adoptante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setUserType('volunteer') }}
                        style={[styles.buttonUser, userType == 'volunteer' ? styles.buttonUserSelected : styles.buttonUser]}
                    >
                        <Text
                            style={[styles.buttonUserText, userType == 'volunteer' ? styles.buttonUserTextSelected : styles.buttonUserText]}
                        >Voluntario</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder='Correo electronico'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                ></TextInput>
                <TextInput
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                ></TextInput>

                <View>
                    <Text
                        style={styles.questionTitle}
                    >Nombre completo</Text>
                    <TextInput
                        placeholder='Escribe tu nombre aquí'
                        value={userName}
                        onChangeText={text => setUserName(text)}
                        keyboardType={'default'}
                        style={styles.input}
                    >
                    </TextInput>
                </View>

                <View>
                    <Text
                        style={styles.questionTitle}
                    >Edad</Text>
                    <TextInput
                        placeholder='Escribe tu edad aquí'
                        value={userAge}
                        onChangeText={text => setUserAge(text)}
                        keyboardType={'numeric'}
                        style={styles.input}
                    >
                    </TextInput>
                </View>

                <View>
                    <Text
                        style={styles.questionTitle}
                    >Dirección de residencia</Text>
                    <TextInput
                        placeholder='Escribe tu dirección aqui'
                        value={userDir}
                        onChangeText={text => setUserDir(text)}
                        keyboardType={'default'}
                        style={styles.input}
                    >
                    </TextInput>
                </View>

                <View>
                    <Text
                        style={styles.questionTitle}
                    >Numero celular o contacto</Text>
                    <TextInput
                        placeholder='Escribe tu número aqui'
                        value={userPhoneNumber}
                        onChangeText={text => setUserPhoneNumber(text)}
                        keyboardType={'numeric'}
                        style={styles.input}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity
                    onPress={() => { handleSignUp() }}
                    style={styles.button}
                >
                    <Text
                        style={styles.buttonText}
                    >Registrarme</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 1
    },
    subContainer: {
        width: '80%',
        minHeight: '100%'
    },
    registerLogo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
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
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FF7B36',
        borderWidth: 2

    },
    buttonOutlineText: {
        color: '#FF7B36',

    },
    buttonContainerUser: {
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonUser: {
        backgroundColor: 'white',
        width: '40%',
        marginTop: 5,
        marginRight: 1,
        marginBottom: 0,
        marginLeft: 1,
        borderColor: '#FF7B36',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center'

    },
    buttonUserSelected: {
        backgroundColor: '#FF7B36',
        width: '50%',
        marginTop: 5,
        marginRight: 1,
        marginBottom: 0,
        marginLeft: 1,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center'

    },
    buttonUserText: {
        color: '#FF7B36',
        fontWeight: '700',
        fontSize: 14,
        margin: 4

    },
    buttonUserTextSelected: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        margin: 4

    },
    buttonContainerUser__title: {
        alignSelf: 'center',
        marginBottom: 2
    },
    questionTitle: {
        paddingLeft: 15,
        marginTop: 10,
        fontWeight: '600',
        color: '#A5A5A5'
    }
});
export default RegisterPage;