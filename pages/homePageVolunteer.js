import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView, Pressable } from 'react-native';
import NavHeader from '../components/navHeader';
import { RadioGroup, RadioButton } from 'react-native-radio-buttons-group';

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../firebase';
import { getDatabase, ref, get, set, onValue, update } from "firebase/database";

const HomePageVolunteer = ({ navigation }) => {

    const [usersDatabase, setUsersDatabase] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentForm, setCurrentForm] = useState(false);
    const [userRated, setUserRated] = useState(false);

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
            // console.log(usersDatabase);

            //  setUsersDatabase(data);
            //  console.log(usersDatabase);
        });


        // handleFetchUsers().then((snapshot) => {
        //     snapshot..forEach(function (childSnapshot) {
        //         setUsersDatabase(usersDatabase => [...usersDatabase, childSnapshot]);

        //     });
        //     console.log(usersDatabase);
        // })
    }, []);

    // Get userType from database

    const handleFetchUsers = () => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            const reference = ref(db, '/users/');

            get(reference).then((snapshot) => {
                if (snapshot.exists) {
                    resolve(snapshot);
                } else {
                    console.log('no ay');
                }
            }).catch((error) => {
                console.error(error);
            });
        });
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
                    status: grade
                });

                break;

            case 'approved':
                update(reference, {
                    status: grade
                });
                break;
            default:
                break;
        }

        setModalVisible(!modalVisible)

    }

    return (
        <>
            <View style={styles.headerContainer}>
                <NavHeader handleCallLogOut={handleLogOut}>
                </NavHeader>
            </View>

            <View style={styles.container}>
                <Text>¡Bienvenido, voluntario!</Text>
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
                                <Text style={styles.buttonText}>Reprobar adoptante</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.buttonMod, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.buttonText}>Cerrar</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.buttonMod, styles.buttonApp]}
                                onPress={() => handleRateUser('approved')}
                            >
                                <Text style={styles.buttonText}>Aprobar adoptante</Text>
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
                                    <Text style={[styles.statusPending, styles.plaintext]}>Estado:</Text>
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

            </View>
        </>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%'
    },
    button: {
        backgroundColor: '#FF7B36',
        width: '50%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12

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
        height: 30,
        width: 30,
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
        flexDirection: 'row'

    },
    questionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
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
        fontSize: 20,
        fontWeight: '700',
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
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    statusPending: {
        color: '#bfa812',
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    plaintext: {
        textDecorationLine: 'none',
        color: '#000'
    }
});
export default HomePageVolunteer;