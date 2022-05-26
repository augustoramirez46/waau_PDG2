import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useRef } from 'react';

import { Ionicons } from '@expo/vector-icons';

// Styles
import { Fonts, FontsSizes } from "../../../config/useFonts.js";

const SubmitTabAdopter = () => {
    const [submission, setSubmission] = useState([
        {
            key: 0,
            title: "¿Como te has sentido esta semana?",
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
    ])

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
                        {section.options.map((elem) => (
                            <View>
                                <Image source={emojis[elem - 1].image} />
                            </View>
                        ))}

                    </View>

                ))}
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
    text: {
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        color: '#cecece',
        marginLeft: 10,
        paddingTop: 2

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
    }
})