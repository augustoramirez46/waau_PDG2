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
            form
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingTop: StatusBar.currentHeight + 50, paddingLeft: 30, paddingRight: 30 }}>
                {form.map((parentQuestion) =>
                (
                    <View>
                        <Text key={parentQuestion.key}>{parentQuestion.question}</Text>
                        {parentQuestion.isOpenEnded ?
                            <SafeAreaView>
                                <TextInput
                                    placeholder='Escribe aqui'
                                    value={parentQuestion.response}
                                    onChangeText={text => handleQuestion(parentQuestion.key, text)}
                                    keyboardType={parentQuestion.questionType}
                                ></TextInput>
                            </SafeAreaView>
                            :
                            parentQuestion.options.map((childOption) => (
                                <RadioButton
                                    label={childOption}
                                    selected={parentQuestion.response == childOption}
                                    // The () => {} is so the handle doesn't launch instantly
                                    onPress={() => { handleRadioButton(parentQuestion.key, childOption) }}
                                >{childOption}</RadioButton>
                            ))

                        }
                    </View>
                )
                )}

                <TouchableOpacity
                    onPress={handleFormSubmission}
                    style={styles.button}
                ></TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'

    }
});

export default FormPage;