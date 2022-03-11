import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase';




const LoginPage = ({ navigation }) => {
    const [isSignedIn, setSignedIn] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {

        createUserWithEmailAndPassword(authentication, email, password)
            .then((re) => {

                console.log(re);
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >

            <View style={styles.inputContainer}>
                <Text>Login</Text>
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
                    onPress={() => { }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registrarme</Text>
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


    },
});

//    <Button
//        title="Login"
//        onPress={() => navigation.navigate('Home')}
//    />
export default LoginPage;