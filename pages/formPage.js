import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-radio-buttons-group';

import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const FormPage = () => {
    const [form, setForm] = useState([
        {
            key: 0,
            question: "¿Tienes mascotas actualmente en tu hogar?",
            options: ["Si", "No"],
            isOpenEnded: false,
            response: "",
        },
        {
            key: 1,
            question: "¿En qué tipo de vivienda reside?",
            options: [
                "Apartamento",
                "Casa",
                "Finca",
                "Otro",
            ],
            isOpenEnded: false,
            response: "",
        },
        {
            key: 2,
            question: "¿Cuántas personas viven contigo?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "numeric",
        },
        {
            key: 3,
            question: "¿Las personas que viven contigo están de acuerdo en recibir a un perrito dentro del hogar?",
            options: ["Si", "No"],
            isOpenEnded: false,
            response: "",
        },
        {
            key: 4,
            question: "¿Pregunta abierta 2?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },

    ]);

    const handleQuestion = (key, response) => {
        const formClone = JSON.parse(JSON.stringify(form));
        formClone[key].response = response;
        setForm(formClone);
    }

    const handleRadioButton = (key, label) => {
        const formClone = JSON.parse(JSON.stringify(form));
        formClone[key].response = label;
        setForm(formClone);

    }

    const handleFormSubmission = () => {
        const db = getDatabase();
        const userUID = getAuth().currentUser.uid;
        const reference = ref(db, '/users/' + userUID + '/responses/');

        set(reference, {
            status: 'sent',
            form
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.formTitle}>Pre-diagnóstico de adopción</Text>
                    {form.map((parentQuestion) =>
                    (
                        <View
                            style={styles.questionContainer}
                        >
                            <Text
                                key={parentQuestion.key}
                                style={styles.questionTitle}
                            >
                                {parentQuestion.question}
                            </Text>

                            {parentQuestion.isOpenEnded ?
                                <KeyboardAvoidingView
                                    behavior='padding'
                                >
                                    <TextInput
                                        placeholder='Escribe aqui'
                                        value={parentQuestion.response}
                                        onChangeText={text => handleQuestion(parentQuestion.key, text)}
                                        keyboardType={parentQuestion.questionType}
                                        style={styles.input}
                                    ></TextInput>
                                </KeyboardAvoidingView>
                                :
                                parentQuestion.options.map((childOption) => (
                                    <RadioButton
                                        label={childOption}
                                        selected={parentQuestion.response == childOption}
                                        // The () => {} is so the handle doesn't launch instantly
                                        onPress={() => { handleRadioButton(parentQuestion.key, childOption) }}
                                        containerStyle={parentQuestion.response == childOption ? styles.option__selected : styles.option}
                                        style={parentQuestion.response == childOption ? styles.option__selected : styles.option}
                                    >{childOption}</RadioButton>
                                ))

                            }
                        </View>
                    )
                    )}

                    <TouchableOpacity
                        onPress={handleFormSubmission}
                        style={styles.button}
                    >
                        <Text
                            style={styles.buttonText}
                        >Enviar respuestas</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',

    },
    subContainer: {
        width: '90%',
        alignSelf: 'center',
        minHeight: '100%'
    },
    formTitle: {
        alignSelf: 'center',
        margin: 10,
    },
    questionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#A5A5A5',
        paddingLeft: 10,
        marginBottom: 10

    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16

    },
    questionContainer: {
        marginTop: 25,

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    option: {
        padding: 17,
        borderWidth: 1,
        borderColor: '#c8c8c8',
        borderRadius: 5,
    },
    option__selected: {
        padding: 17,
        borderRadius: 5,
        backgroundColor: '#FF7B36',
        color: '#ffffff',
    }
});

export default FormPage;