import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

// Fonts
import { Fonts, FontsSizes } from "../config/useFonts.js";


const PrevSignup = ({ navigation }) => {

    const [userTypePrev, setUserTypePrev] = useState('');

    const handleToSignup = () => {
        navigation.navigate("Register")

    }

    const handleSelectOption = (name) => {
        switch (name) {
            case 'adopter':
                setUserTypePrev(name);

                break;
            case 'volunteer':
                setUserTypePrev(name);

                break;

            default:
                break;
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={userTypePrev == 'adopter' ? [styles.option, styles.optionSel] : styles.option}
                onPress={() => { handleSelectOption('adopter') }}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../resources/img/adopter.png')} />
                </View>
                <View>
                    <Text style={userTypePrev == 'adopter' ? [styles.title, styles.sel] : styles.title}>
                        Adoptante
                    </Text>
                    <Text style={userTypePrev == 'adopter' ? [styles.paragraph, styles.sel] : styles.paragraph}>
                        Buscas adoptar un compañero de vida para tu hogar.
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={userTypePrev == 'volunteer' ? [styles.option, styles.optionSel] : styles.option}
                onPress={() => { handleSelectOption('volunteer') }}>

                <View>
                    <Text style={userTypePrev == 'volunteer' ? [styles.title, styles.sel] : styles.title}>
                        Voluntario
                    </Text>
                    <Text style={userTypePrev == 'volunteer' ? [styles.paragraph, styles.sel] : styles.paragraph}>
                        Estás buscandole un hogar a uno o más peluditos.                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../resources/img/volunteer.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { handleToSignup() }}
                style={styles.button}
            >
                <Text
                    style={styles.buttonText}
                >Siguiente</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'space-between',
        alignSelf: 'center',

    },
    title: {
        fontSize: FontsSizes.title,
        fontFamily: Fonts.Poppins.Bold,
        color: 'gray'

    },
    paragraph: {
        fontSize: FontsSizes.paragraph,
        fontFamily: Fonts.Poppins.Regular,
        color: 'gray',
        width: 150,
        textAlign: 'justify'

    },
    sel: {
        color: 'white'
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20

    },
    buttonText: {
        color: 'white',
        fontSize: FontsSizes.subtitle,
        fontFamily: Fonts.Poppins.Bold

    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 15,
        padding: 10,
        marginTop: 65
    },
    optionSel: {
        backgroundColor: '#FF7B36'
    },
    imageContainer: {
        width: "50%",
        height: 135
    },
    image: {
        position: 'absolute',
        top: -65
    }

})
export default PrevSignup