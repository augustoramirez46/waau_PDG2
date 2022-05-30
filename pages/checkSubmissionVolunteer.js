import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

// Styles
import { Fonts, FontsSizes } from "../config/useFonts.js";
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { signOut, getAuth } from 'firebase/auth';
import { authentication } from '../firebase';
import { getDatabase, ref, get, set, onValue, update } from "firebase/database";

const CheckSubmissionVolunteer = () => {

    const [usersDatabase, setUsersDatabase] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSubmit, setCurrentSubmit] = useState([]);

    const emojis = [
        {
            id: '1',
            image: require("../resources/img/smileys/01.png")
        },
        {
            id: '2',
            image: require("../resources/img/smileys/02.png")
        },
        {
            id: '3',
            image: require("../resources/img/smileys/03.png")
        },
        {
            id: '4',
            image: require("../resources/img/smileys/04.png")
        },

    ]

    const selectedEmoji = [
        {
            id: '1',
            image: require("../resources/img/smileys/011.png")
        },
        {
            id: '2',
            image: require("../resources/img/smileys/022.png")
        },
        {
            id: '3',
            image: require("../resources/img/smileys/033.png")
        },
        {
            id: '4',
            image: require("../resources/img/smileys/044.png")
        },
    ]

    useEffect(() => {

        const db = getDatabase();
        const reference = ref(db, '/users/');

        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            if (data != null) {
                setUsersDatabase([]);

                Object.values(data).map((user) => {
                    setUsersDatabase(oldArray => [...oldArray, user]);
                });
            }

        });

    }, []);

    const handleShowModal = (elem) => {
        setCurrentSubmit([]);
        const user = elem;
        Object.values(user.submissions.first.submission).map((item) => {
            setCurrentSubmit(oldArray => [...oldArray, item]);
        });
        console.log(currentSubmit);
        setModalVisible(!modalVisible);

    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <ScrollView contentContainerStyle={styles.modalView}>
                    {(currentSubmit != [])
                        ?
                        currentSubmit.map((section) =>
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

                                        <View>
                                            <Image source={
                                                section.response == elem
                                                    ? selectedEmoji[elem - 1].image
                                                    :
                                                    emojis[elem - 1].image} />
                                        </View>

                                    ))}
                                </View>
                                <View

                                >
                                    <Text

                                        style={styles.input}
                                    >{section.textResponse}</Text>
                                </View>

                            </View>

                        ))
                        :
                        <></>
                    }
                    <View style={styles.modalButtonContainer}>

                        <Pressable
                            style={[styles.buttonMod, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Ionicons
                                name="exit-outline"
                                color={"white"}
                                size={25}
                            />
                        </Pressable>

                    </View>
                </ScrollView>
            </Modal>


            {usersDatabase.map((user) => (
                <View style={{ width: '100%' }}>
                    {(user.responses && (user.responses.status == 'sent' || user.responses.status == 'pending'))
                        ?
                        <View style={styles.responseContainer}>
                            <Ionicons
                                name="search-circle-outline"
                                color={"gray"}
                                size={35}
                            />
                            <View style={styles.notificationTextContainer}>
                                <Text style={styles.notificationHeadline}>{(user.responses.status == 'sent' ? `${user.userName} ha subido una actualización` : `${user.userName} se ha creado una cuenta nueva`)}</Text>


                                {(user.submissions)
                                    ?
                                    < TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleShowModal(user)}
                                    >
                                        <Text
                                            style={styles.buttonText}
                                        >
                                            REVISAR
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    < View
                                        style={[styles.button, styles.buttonDissabled]}

                                    >
                                        <Text
                                            style={styles.buttonText}
                                        >
                                            REVISAR
                                        </Text>
                                    </View>

                                }


                            </View>
                        </View>
                        :

                        <></>
                    }
                </View>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: '20%',
        marginTop: '5%'
    },
    headerContainer: {
        width: '100%'
    },
    volunteerTitle: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        marginBottom: 30,
        color: '#9b9b9b'
    },
    volunteerSubtitle: {
        fontFamily: Fonts.Poppins.SemiBold,
        fontSize: FontsSizes.paragraph,
        color: '#a3a3a3',
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '50%',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',

    },
    buttonOutline: {
        borderColor: '#FF7B36',
        width: '45%',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'flex-end',

    },
    buttonText: {
        color: 'white',
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.paragraph

    },
    responseContainer: {
        display: 'flex',
        width: '80%',
        borderWidth: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderColor: '#c0c0c0',
        padding: 10,
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    notificationIcon: {
        height: 20,
        width: 20,
        margin: 10,
        marginLeft: 0

    },
    notificationTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between'

    },
    notificationHeadline: {
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        width: '100%',
        marginRight: 'auto',
        marginBottom: 5,

    },
    modalView: {

        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonDissabled: {
        backgroundColor: '#d2d2d2'
    },
    buttonMod: {
        borderRadius: 50,
        padding: 20,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5
    },
    buttonClose: {
        backgroundColor: "#7d7d7d",
    },
    buttonRej: {
        backgroundColor: "#ef8787",
    },
    buttonApp: {
        backgroundColor: "#b0eac8",
    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-around',
        justifyContent: 'space-around'

    },
    questionTitle: {
        // pegar
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        width: 300,
        color: '#A5A5A5',
        paddingLeft: 10,
        marginBottom: 10

    },
    questionContainer: {
        marginTop: 25,
    },
    responseText: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: Fonts.Poppins.SemiBold,
        fontSize: FontsSizes.subtitle,
        marginLeft: 'auto',
        marginRight: 'auto'

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
    },
    statusSent: {
        color: '#3bc922',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    statusPending: {
        color: '#bfa812',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    plaintext: {
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        textDecorationLine: 'none',
        color: '#000'
    },
    bottomNav: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    bottomNavText: {
        color: 'gray',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph

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
});

export default CheckSubmissionVolunteer