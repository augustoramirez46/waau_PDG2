import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import React, { useState, useRef } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Styles
import { Fonts, FontsSizes } from "../../../config/useFonts.js";

const SubmitTabAdopter = ({ navigation }) => {
    const [submission, setSubmission] = useState([
        {
            key: 0,
            title: "¿Cómo te has sentido esta semana?",
            options: [1, 2, 3, 4],
            response: 0,
            textResponse: ""
        },
        {
            key: 1,
            title: "¿Y tu mascota? 🐶",
            options: [1, 2, 3, 4],
            response: 0,
            textResponse: ""
        }
    ]);
    const [sent, setIsSent] = useState(false);
    const emojis = [
        {
            id: '1',
            image: require("../../../resources/img/smileys/01.png")
        },
        {
            id: '2',
            image: require("../../../resources/img/smileys/02.png")
        },
        {
            id: '3',
            image: require("../../../resources/img/smileys/03.png")
        },
        {
            id: '4',
            image: require("../../../resources/img/smileys/04.png")
        },

    ]

    const selectedEmoji = [
        {
            id: '1',
            image: require("../../../resources/img/smileys/011.png")
        },
        {
            id: '2',
            image: require("../../../resources/img/smileys/022.png")
        },
        {
            id: '3',
            image: require("../../../resources/img/smileys/033.png")
        },
        {
            id: '4',
            image: require("../../../resources/img/smileys/044.png")
        },
    ]

    const handleSubmitSubmission = () => {
        const db = getDatabase();
        const userUID = getAuth().currentUser.uid;
        const reference = ref(db, '/users/' + userUID + '/submissions/' + '/first/');

        update(reference, {
            submission
        });

        createOneButtonAlert();
        setIsSent(true)
    }

    // Alert 

    const createOneButtonAlert = () =>

        Alert.alert(
            "¡Súper!",
            "Ha sido enviado el reporte exitosamente",
            [
                { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
        );



    const handleInput = (key, response) => {
        const clone = JSON.parse(JSON.stringify(submission));
        clone[key].textResponse = response;
        setSubmission(clone);
    }

    const handleEmoji = (key, emoji) => {
        const clone = JSON.parse(JSON.stringify(submission));
        clone[key].response = emoji;
        setSubmission(clone);
        console.log(submission)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reporte de estado</Text>
            <View style={styles.submissionContainer}>
                {submission.map((section) =>
                (
                    <View
                        key={section.key}
                        style={styles.submissionQuestion}
                    >
                        <Text
                            style={styles.text}
                        >
                            {section.title}
                        </Text>
                        <View style={styles.emojiContainer}>
                            {section.options.map((elem) => (

                                <TouchableOpacity
                                    onPress={() => handleEmoji(section.key, elem)}
                                >
                                    <Image source={
                                        section.response == elem
                                            ? selectedEmoji[elem - 1].image
                                            :
                                            emojis[elem - 1].image} />
                                </TouchableOpacity>

                            ))}
                        </View>
                        <KeyboardAvoidingView
                            behavior='padding'
                        >
                            <TextInput
                                placeholder='Explicanos un poco el porque'
                                value={section.textResponse}
                                onChangeText={text => handleInput(section.key, text)}
                                style={styles.input}
                            ></TextInput>
                        </KeyboardAvoidingView>

                    </View>

                ))}
                <View style={styles.bottomsubmit}>
                    <View style={styles.attachContainer}>
                        <Text style={styles.text}>Adjuntar foto del can:</Text>
                        <TouchableOpacity style={styles.attachButton}>
                            <Ionicons
                                name="document-attach-outline"
                                color={"#FF7B36"}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleSubmitSubmission()}
                        style={styles.button}
                    >
                        <Text
                            style={styles.buttonText}
                        >Enviar reporte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SubmitTabAdopter;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: '35%',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',

    },
    title: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        color: 'gray'
    },
    finderContainer: {
        width: '78%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#cecece',
        marginTop: 15,
        marginBottom: 30,
        paddingLeft: 10
    },
    emojiContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        padding: 5,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#F9FBE7',
        justifyContent: 'space-around',
        alignSelf: 'center'
    },
    text: {
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        textAlign: 'center',
        color: '#6c6774',
        marginLeft: 10,
        paddingTop: 2,
        alignSelf: 'center'

    },
    submissionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#cecece',
        borderRadius: 15,
        height: '90%',
        width: '90%'
    },
    submissionQuestion: {
        width: '90%',
        marginBottom: 15
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
        alignSelf: 'center',
        width: 200

    },
    buttonText: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.paragraph,
        color: 'white',


    },
    attachContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    attachButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#FF7B36',
        width: 80,
        alignItems: 'center',
        marginLeft: 10,
        padding: 1,
        borderRadius: 5
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        width: '100%'
    },
})