import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppLoading from 'expo-app-loading';

// Firebase
import { signOut, getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set, onValue, update } from "firebase/database";

import { Fonts, FontsSizes } from "../../../config/useFonts.js";
import { Ionicons } from '@expo/vector-icons';

const HomeTabAdopter = ({ navigation }) => {
    let [isLoaded, setIsLoaded] = useState(false);
    const images = [
        {
            id: 'pending',
            image: require("../../../resources/img/adopterStatus/adop01.png")
        },
        {
            id: 'sent',
            image: require("../../../resources/img/adopterStatus/adop02.png")
        },
        {
            id: 'approved',
            image: require("../../../resources/img/adopterStatus/adop03.png")
        },
        {
            id: 'failed',
            image: require("../../../resources/img/adopterStatus/adop04.png")
        },
    ]
    const [currentAdopter, setCurrentAdopter] = useState([]);

    useEffect(() => {

        const db = getDatabase();
        const userUID = getAuth().currentUser.uid;
        const reference = ref(db, '/users/' + userUID);

        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            if (data != null) {
                setCurrentAdopter([]);

                setCurrentAdopter(data);
                setIsLoaded(true);
            }

        });

    }, []);

    const handleNavigateForm = () => {
        navigation.navigate("Form");

    }

    const handleNavigateChat = () => {
        navigation.navigate("ChatPage");

    }

    if (!isLoaded) {
        return <AppLoading />
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{`¡Buenas tardes ${currentAdopter.userName}!`}</Text>

            {images.map((badge) => (
                (currentAdopter.responses.status != undefined) ?
                    badge.id == currentAdopter.responses.status ?
                        <View>
                            <Image source={badge.image} />

                            <Text style={styles.userNameBadge}>{currentAdopter.userName}</Text>
                        </View>
                        :
                        <></>
                    :
                    <></>
            ))}

            <View style={styles.buttonContainer}>
                {(currentAdopter.responses.status == "failed" || currentAdopter.responses.status == "sent") ?
                    <View

                        style={[styles.button, styles.buttonWidth, styles.buttonInactive]}
                    >
                        <Text style={[styles.buttonText, styles.buttonTextInactive]}>¡Gracias! en breve te notificaremos los resultados.</Text>
                    </View>

                    :
                    <TouchableOpacity
                        onPress={handleNavigateForm}
                        style={[styles.button, styles.buttonWidth]}
                    >

                        <Text style={styles.buttonText}>¡Queremos conocerte mejor!</Text>
                    </TouchableOpacity>
                }


            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        color: 'gray',
        textAlign: 'center'
    },
    userNameBadge: {
        position: 'absolute',
        alignSelf: 'center',
        top: 240,
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.paragraph,
        color: 'gray'

    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center'

    },
    button: {
        borderRadius: 10,
        borderWidth: 1.5,
        backgroundColor: '#FF7B36',
        borderColor: '#FF7B36',
        width: '40%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    buttonInactive: {
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 0,

    },
    buttonWidth: {
        width: '100%'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.subtitle,

    },
    buttonTextInactive: {
        color: 'gray',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.subtitle,
    }
});

export default HomeTabAdopter