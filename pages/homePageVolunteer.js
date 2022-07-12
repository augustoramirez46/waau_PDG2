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
    const [rng, setRng] = useState(1);

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

        var number = Math.floor(Math.random() * (1 - 0 + 1)) + 0
        setRng(number);
        console.log(rng)

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
                <NavHeader
                    handleCallLogOut={handleLogOut}
                    handleCallToChat={handleNavigateChat}>
                </NavHeader>
            </View>

            <View style={styles.container}>
                <Text style={styles.volunteerTitle}>{(currentVolunteer) ? `¡Buenas tardes, ${currentVolunteer.userName}!` : `¡Buenas tardes!`}</Text>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <ScrollView contentContainerStyle={styles.modalView}>
                        <Pressable
                            style={[styles.buttonMod, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Ionicons
                                name="close-circle-outline"
                                color={"white"}
                                size={20}
                            />
                        </Pressable>
                        <Text style={styles.volunteerTitle}>Respuestas:</Text>
                        {(currentForm)
                            ?
                            currentForm.map((cform) =>
                            (
                                <View
                                    style={styles.questionContainer}
                                >
                                    <Text
                                        style={styles.counterText}
                                    >
                                        {`Pregunta ${cform.key + 1}/26`}
                                    </Text>
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
                                <Text style={styles.buttonModText}>Reprobar.</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.buttonMod, styles.buttonApp]}
                                onPress={() => handleRateUser('approved')}
                            >
                                <Text style={styles.buttonModText}>Aprobar.</Text>
                            </Pressable>

                        </View>
                    </ScrollView>
                </Modal>

                <ScrollView style={styles.cardContainer}>
                    <Text style={styles.volunteerSubtitle}>Actualizaciones recientes:</Text>
                    {usersDatabase.map((user) => (
                        <View style={{ width: '100%' }}>
                            {(user.responses && (user.responses.status == 'sent' || user.responses.status == 'pending'))
                                ?
                                <View style={styles.responseContainer}>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>

                                        {/* {
                                            (user.responses.status == 'sent')
                                                ?
                                                (rng == 1)
                                                    ?
                                                    <Ionicons
                                                        name="star-half-sharp"
                                                        color={"#FBC02D"}
                                                        size={19}
                                                    />
                                                    :
                                                    <Ionicons
                                                        name="star-sharp"
                                                        color={"#8BC34A"}
                                                        size={19}
                                                    />
                                                :
                                                <></>
                                        } */}

                                    </View>
                                    <View style={styles.notificationTextContainer}>
                                        <View style={(user.responses.status == 'sent' ? styles.statusContainerSent : styles.statusContainerPending)}>
                                            <Text
                                                style={(user.responses.status == 'sent' ? styles.statusSent : styles.statusPending)}
                                            >
                                                {`FORMULARIO: ${(user.responses.status == 'sent' ? 'ENVIADO' : 'PENDIENTE')}`}
                                            </Text>
                                        </View>
                                        <Text style={styles.notificationHeadline}>{(user.responses.status == 'sent' ? `${user.userName} ha subido una actualización` : `${user.userName} se ha creado una cuenta nueva`)}</Text>


                                        {(user.responses.status == 'sent')
                                            ?
                                            < TouchableOpacity
                                                style={styles.button}
                                                onPress={() => handleShowModal(user)}
                                            >
                                                <Text
                                                    style={styles.buttonText}
                                                >
                                                    Revisar.
                                                </Text>
                                            </TouchableOpacity>
                                            :
                                            < View
                                                style={[styles.button, styles.buttonDissabled]}

                                            >
                                                <Text
                                                    style={styles.buttonText}
                                                >
                                                    Revisar.
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
                </ScrollView>
                <View style={styles.bottomNav}>

                    <TouchableOpacity
                        onPress={handleNavigateSubmissions}
                        style={styles.bottomNavButton}
                    >

                        <Ionicons
                            name="document-text-outline"
                            color={"white"}
                            size={25}
                        />
                        <Text style={styles.bottomNavText}>
                            Reportes
                        </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                </View>
            </View>
        </>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        height: '100%',
        paddingTop: 80,
        paddingBottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContainer: {
        width: '100%'
    },
    volunteerTitle: {
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.title,
        textAlign: 'center',
        marginBottom: 30,
        color: '#9b9b9b'
    },
    volunteerSubtitle: {
        fontFamily: Fonts.Poppins.SemiBold,
        fontSize: FontsSizes.paragraph,
        color: '#FF7B36',
        alignSelf: 'flex-start',
        marginBottom: 0,
        marginLeft: 2
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
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderColor: '#c0c0c0',
        padding: 10,
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },

        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
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
        color: 'gray',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        textAlign: 'justify',
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
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5
    },
    buttonClose: {
        borderRadius: 50,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 2,
        top: 5,
        backgroundColor: "#C4C4C4",
    },
    buttonRej: {
        backgroundColor: "#ef8787",
    },
    buttonApp: {
        backgroundColor: "#b0eac8",
    },
    buttonModText: {
        fontFamily: Fonts.Poppins.SemiBold,
        fontSize: FontsSizes.subtitle,
        color: 'white'
    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-around',
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 20

    },
    questionTitle: {
        fontFamily: Fonts.Poppins.SemiBold,
        fontSize: FontsSizes.subtitle,
        textAlign: 'left',
        lineHeight: 30,
        color: '#A5A5A5',
        paddingLeft: 10,
        marginTop: 70,
        marginBottom: 10
    },
    questionContainer: {
        marginTop: 25,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 5,
        paddingBottom: 5

    },
    counterText: {
        fontFamily: Fonts.Poppins.regular,
        fontSize: FontsSizes.paragraph,
        color: '#FF7B36',
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        alignSelf: 'flex-end'
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
    statusContainerPending: {
        padding: 10,
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor: '#FFF5D3',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    statusContainerSent: {
        padding: 10,
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor: '#DEFCAD',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    statusSent: {
        color: '#3bc922',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: 9,
        alignSelf: 'center'
    },
    statusPending: {
        color: '#bfa812',
        fontFamily: Fonts.Poppins.Regular,
        fontSize: 9,
        alignSelf: 'center'
    },
    plaintext: {
        marginVertical: 10,
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        textDecorationLine: 'none',
        color: 'gray'
    },
    bottomNav: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    bottomNavText: {
        color: 'gray',
        fontFamily: Fonts.Poppins.Bold,
        fontSize: FontsSizes.subtitle,
        color: 'white',
        marginLeft: 3,
        alignSelf: 'center',
        marginVertical: 'auto'

    },
    bottomNavButton: {
        borderRadius: 10,
        backgroundColor: '#FF7B36',
        padding: 5,
        paddingVertical: 8,
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'

    },
    cardContainer: {
        width: '100%',

    }
});
export default HomePageVolunteer;