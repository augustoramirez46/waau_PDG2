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
        console.log(currentAdopter);
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
                {(currentAdopter.responses.status == "failed") ?
                    <View

                        style={[styles.button, styles.buttonInactive]}
                    >
                        <Ionicons
                            name="archive-outline"
                            color={"lightgray"}
                            size={25}
                        />
                        <Text style={[styles.buttonText, styles.buttonTextInactive]}>Ir al formulario</Text>
                    </View>

                    :
                    <TouchableOpacity
                        onPress={handleNavigateForm}
                        style={styles.button}
                    >
                        <Ionicons
                            name="archive-outline"
                            color={"#FF7B36"}
                            size={25}
                        />
                        <Text style={styles.buttonText}>Ir al formulario</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={handleNavigateChat}
                    style={styles.button}
                >
                    <Ionicons
                        name="chatbox-ellipses-outline"
                        color={"#FF7B36"}
                        size={25}
                    />
                    <Text style={styles.buttonText}>Ir al chat</Text>
                </TouchableOpacity>
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
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FF7B36',
        width: '40%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonInactive: {
        borderColor: 'lightgray',

    },
    buttonText: {
        color: 'gray',
        textAlign: 'center',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,

    },
    buttonTextInactive: {
        color: 'gray',
    }
});

export default HomeTabAdopter