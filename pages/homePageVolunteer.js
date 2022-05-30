import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView, Pressable } from 'react-native';
import NavHeader from '../components/navHeader';
import { RadioGroup, RadioButton } from 'react-native-radio-buttons-group';
import AppLoading from "expo-app-loading";

// Styles
import { Fonts, FontsSizes } from "../config/useFonts.js";
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { signOut, getAuth } from 'firebase/auth';
import { authentication } from '../firebase';
import { getDatabase, ref, get, set, onValue, update } from "firebase/database";

const HomePageVolunteer = ({ navigation }) => {

    const [usersDatabase, setUsersDatabase] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentForm, setCurrentForm] = useState(false);
    const [userRated, setUserRated] = useState(false);
    const [currentVolunteer, setCurrentVolunteer] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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

        handleFetchUser();

    }, []);

    // Get userType from database

    const handleFetchUser = () => {

        const db = getDatabase();
        const userUID = getAuth().currentUser.uid;
        const reference = ref(db, '/users/' + userUID);

        onValue(reference, (snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.val();
                // console.log(data);
                if (data != null) {
                    setCurrentVolunteer([]);

                    setCurrentVolunteer(data);
                    setIsLoaded(true)
                }
            }
        })
    }

    // Logout for navheader

    const handleLogOut = () => {
        signOut(authentication)
            .then((re) => {
                navigation.navigate("Login");
            })
            .catch(error => alert(error.message))
    }

    const handleShowModal = (elem) => {

        const user = elem;
        setCurrentForm(JSON.parse(JSON.stringify(user.responses.form)));
        setUserRated(JSON.parse(JSON.stringify(user)))

        setModalVisible(!modalVisible);
        // console.log(currentForm);


    }

    const handleRateUser = (grade) => {
        const db = getDatabase();
        const UID = userRated.userUID
        const reference = ref(db, '/users/' + UID + '/responses/');

        switch (grade) {
            case 'failed':
                update(reference, {
                    status: 'failed'
                });

                break;

            case 'approved':
                update(reference, {
                    status: 'approved'
                });
                break;
            default:
                break;
        }

        setModalVisible(!modalVisible)

    }

    // Navigates to the chat

    const handleNavigateChat = () => {
        navigation.navigate("ChatPage");
    }

    const handleNavigateSubmissions = () => {
        navigation.navigate("CheckSubmission");
    }

    // if (!currentVolunteer) {
    //     return <AppLoading />;
    // }

    if (!isLoaded) {
        return <AppLoading />
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <NavHeader handleCallLogOut={handleLogOut}>
                </NavHeader>
            </View>

            <View style={styles.container}>
                <Text style={styles.volunteerTitle}>{(currentVolunteer) ? `¡Buenas tardes ${currentVolunteer.userName}!` : `¡Buenas tardes!`}</Text>
                <Text style={styles.volunteerSubtitle}>Actualizaciones recientes:</Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <ScrollView contentContainerStyle={styles.modalView}>
                        {(currentForm)
                            ?
                            currentForm.map((cform) =>
                            (
                                <View
                                    style={styles.questionContainer}
                                >
                                    <Text
                                        key={cform.key}
                                        style={styles.questionTitle}
                                    >
                                        {cform.question}
                                    </Text>

                                    {cform.isOpenEnded ?
                                        <View
                                            behavior='padding'
                                        >
                                            <Text
                                                value={cform.response}
                                                keyboardType={cform.questionType}
                                                style={styles.responseText}
                                            >{cform.response}</Text>
                                        </View>
                                        :
                                        cform.options.map((childOption) => (
                                            <RadioButton
                                                label={childOption}
                                                selected={cform.response == childOption}
                                                // The () => {} is so the handle doesn't launch instantly
                                                containerStyle={cform.response == childOption ? styles.option__selected : styles.option}
                                                style={cform.response == childOption ? styles.option__selected : styles.option}
                                            >{childOption}</RadioButton>
                                        ))

                                    }
                                </View>
                            )
                            )

                            :
                            <></>
                        }
                        <View style={styles.modalButtonContainer}>

                            <Pressable
                                style={[styles.buttonMod, styles.buttonRej]}
                                onPress={() => handleRateUser('failed')}
                            >
                                <Ionicons
                                    name="close-circle-outline"
                                    color={"white"}
                                    size={25}
                                />
                            </Pressable>

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

                            <Pressable
                                style={[styles.buttonMod, styles.buttonApp]}
                                onPress={() => handleRateUser('approved')}
                            >

                                <Ionicons
                                    name="checkmark-circle-outline"
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
                                <Image style={styles.notificationIcon} source={require('../resources/img/ic_round-notifications.png')} />
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationHeadline}>{(user.responses.status == 'sent' ? `${user.userName} ha subido una actualización` : `${user.userName} se ha creado una cuenta nueva`)}</Text>
                                    <Text style={[styles.statusPending, styles.plaintext]}>Form:</Text>
                                    <Text style={(user.responses.status == 'sent' ? styles.statusSent : styles.statusPending)}>{(user.responses.status == 'sent' ? 'Enviado' : 'Pendiente')}</Text>

                                    {(user.responses.status == 'sent')
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
                <View style={styles.bottomNav}>

                    <TouchableOpacity
                        onPress={handleNavigateSubmissions}
                        style={styles.buttonOutline}
                    >

                        <Ionicons
                            name="document-text-outline"
                            color={"#FF7B36"}
                            size={25}
                        />
                        <Text style={styles.bottomNavText}>
                            Reportes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleNavigateChat}
                        style={styles.buttonOutline}
                    >
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={"#FF7B36"}
                            size={25}
                        />
                        <Text style={styles.bottomNavText}>
                            Chats
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '100%',
        borderWidth: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderColor: '#c0c0c0',
        padding: 10,
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-end'
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

    }
});
export default HomePageVolunteer;