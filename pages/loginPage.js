import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity, Image, Alert } from 'react-native';

// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';

import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const LoginPage = ({ navigation }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('')

    // Checks if the user is logged in to move forward in the navigation, and which type of user is 

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(authentication, user => {
            if (user && isSignedIn) {

                handleFetchUserType().then((userSnapshot) => {
                    switch (userSnapshot) {
                        case 'adopter':
                            navigation.navigate("HomeAdopter");
                            console.log("desdelNavigate");
                            break;

                        case 'volunteer':
                            navigation.navigate("HomeVolunteer");
                            console.log("desdelNavigate");
                            break;

                        default:
                            return;
                            break;
                    }

                });
            }
        })

        return unsuscribe
    })

    // Signup

    const handleSignUp = () => {
        if (userType == '') {
            createOneButtonAlert();
            return;
        }

        createUserWithEmailAndPassword(authentication, email, password)
            .then((re) => {
                // Submit user type
                handleUserSubmission()

                setTimeout(() => {
                    setIsSignedIn(true);
                }, 1500)

                console.log(re);
            })
            .catch(error => alert(error.message))

    }

    // Login

    const handleLogin = () => {

        signInWithEmailAndPassword(authentication, email, password)
            .then((re) => {
                console.log(re);
                setTimeout(() => {
                    setIsSignedIn(true);
                }, 1500)

            })
            .catch(error => alert(error.message))

    }

    // Log out (unused)

    const handleLogOut = () => {

        signOut(authentication)
            .then((re) => {
                setIsSignedIn(false)
            })
            .catch(error => alert(error.message))

    }

    // User type submission to database

    const handleUserSubmission = () => {

        const db = getDatabase();
        const userUID = getAuth().currentUser.uid;
        const reference = ref(db, '/users/' + userUID);

        set(reference, {
            userType
        });

    }

    // Get userType from database

    const handleFetchUserType = () => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            const userUID = getAuth().currentUser.uid;
            const reference = ref(db, '/users/' + userUID + '/userType/');

            get(reference).then((snapshot) => {
                if (snapshot.exists) {

                    const userSnapshot = snapshot.val();
                    console.log(userSnapshot);
                    resolve(userSnapshot);
                } else {
                    console.log('no ay');
                }
            }).catch((error) => {
                console.error(error);
            });
        });
    }

    // Alert from selecting signup without choosing user type

    const createOneButtonAlert = () =>
        Alert.alert(
            "No hay tipo de usuario seleccionado",
            "Porfavor selecciona si eres adoptante o voluntario",
            [
                { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
        );



    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image style={styles.loginLogo} source={require('../resources/img/icon_transp.png')} />
            <Text>Bienvenid@</Text>


            <View style={styles.inputContainer}>

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

            </View>

            <View
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registrarme</Text>
                </TouchableOpacity>

                <View
                    style={styles.buttonContainerUser}
                >
                    <Text style={styles.buttonContainerUser__title}>Yo soy:</Text>
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

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,

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
    loginLogo: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    buttonContainerUser: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonUser: {
        backgroundColor: 'white',
        width: '50%',
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
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: 10
    }
});

export default LoginPage;