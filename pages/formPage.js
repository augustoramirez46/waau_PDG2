import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-radio-buttons-group';

import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Fonts, FontsSizes } from "../config/useFonts.js";

const FormPage = ({ navigation }) => {
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
            question: "¿Has tenido mascotas anteriormente? ¿Qué pasó con ellas?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 2,
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
            key: 3,
            question: "¿Para tí, donde debe ser el lugar de dormir del perro? ¿Por qué?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 4,
            question: "¿Cuántas personas viven contigo?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "numeric",
        },
        {
            key: 5,
            question: "¿Las personas que viven contigo están de acuerdo en recibir a un perrito dentro del hogar?",
            options: ["Si", "No"],
            isOpenEnded: false,
            response: "",
        },
        {
            key: 6,
            question: "¿A qué áreas de tu casa tendría acceso tu perro?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 7,
            question: "¿Tú o las personas que viven contigo son alérgicos a los perros?",
            options: ["Si", "No"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 8,
            question: "¿Tu casa es propia o de alquiler?",
            options: ["Propia", "Alquiler"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 9,
            question: "¿Qué harías si tu perrito daña algo muy valioso para tí?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 10,
            question: "¿Vives con niños o ancianos?",
            options: ["Si", "No"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 11,
            question: "¿Quién dentro de tu hogar cuidará del perro, sabiendo que ellos reconocen a una persona como su refugio?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 12,
            question: "¿Qué tipo de pelo quieres que tenga tu perro?",
            options: ["Pelo corto", "Pelo medio", "Pelo largo", "No importa"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 13,
            question: "Cuando estés fuera de casa ¿Quién cuidará de tu perro cuando tú no estés?, ¿Cuánto tiempo pasará tu perro solo?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 14,
            question: "¿En qué etapa de vida quieres que esté tu perro?",
            options: ["Cachorro", "Adulto", "Anciano", "No importa"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 15,
            question: "¿En qué situación usted renunciaría a cuidar de su mascota? ¿Qué haría con él?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 16,
            question: "¿Qué tamaño desearías para tu perro?",
            options: ["Pequeño", "Mediano", "Grande", "No importa"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 17,
            question: "¿Con qué frecuencia piensas sacar a pasear a tu perro y a dónde",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 18,
            question: "¿Cuánto tiempo planeas dedicarle a tu perro diariamente?",
            options: ["0 a 3 horas", "4 a 7 horas", "Más de 8 horas"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 19,
            question: "Si te mudas a otro país, ¿Qué harías con tu perro?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 20,
            question: "¿Dónde deben realizar sus necesidades los perros?: defecar y orinar.",
            options: ["Dentro de mi casa", "El patio de mi casa", "Jardín", "En el parque", "Ninguna de las anteriores"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 21,
            question: "¿Cuentas con el dinero necesario para cubrir los gastos de tu perro? ¿En qué piensas que gastarías dinero?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 22,
            question: "¿Qué harías con la materia fecal de tu perro?",
            options: ["Lo dejo donde está", "Lo recojo con una bolsa y lo desecho en la basura", "Lo lavo y deshecho por la cañería"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 23,
            question: "¿Qué tipo de alimento planeas darle a tu perro?",
            options: [],
            isOpenEnded: true,
            response: "",
            questionType: "default",
        },
        {
            key: 24,
            question: "¿Cuánto tiempo planeas dedicarle a tu perro diariamente?",
            options: ["0 a 3 horas", "4 a 7 horas", "Más de 8 horas"],
            isOpenEnded: false,
            response: "",
            questionType: "default",
        },
        {
            key: 25,
            question: "¿Cuáles son las razones para querer llevarte a un perrito a tu hogar? Por favor extiéndete esta pregunta.",
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

        navigation.navigate("HomeAdopter");
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
        color: '#FF7B36',
        fontFamily: Fonts.Poppins.SemiBold,
        fontSize: FontsSizes.title,
        textAlign: 'center'
    },
    questionTitle: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        textAlign: 'left',
        lineHeight: 30,
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
        marginTop: 30,
        marginBottom: 300
    },
    buttonText: {
        color: 'white',
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.paragraph,

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
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
    },
    option: {
        padding: 17,
        borderWidth: 1,
        borderColor: '#c8c8c8',
        borderRadius: 5,
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
    },
    option__selected: {
        padding: 17,
        borderRadius: 5,
        backgroundColor: '#FF7B36',
        color: 'white',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph
    }
});

export default FormPage;