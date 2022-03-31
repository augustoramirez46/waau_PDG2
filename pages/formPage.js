import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native'

const FormPage = () => {
    const [form, setForm] = useState([
        {
            index: 0,
            question: "¿Tienes mascotas actualmente en tu hogar?",
            options: [
                {
                    yes: false,
                    no: false,
                }
            ],
            isOpenEnded: false,

        },
    ]);


    return (
        <ScrollView>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default FormPage;