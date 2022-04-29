import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Image, Alert } from 'react-native';

const NavHeader = (props) => {


    const handleIntermediateCallLogOut = () => {
        props.handleCallLogOut()
    }

    return (
        <View
            style={styles.container}
        >
            <Image style={styles.containerBg} source={require('../resources/img/headerNav.png')} />

            <TouchableOpacity
                style={styles.img}
                onPress={handleIntermediateCallLogOut}
            >
                <Image style={styles.imgInside} source={require('../resources/img/ic_round-power-settings-new.png')} />
            </TouchableOpacity>
            <Image style={styles.imgLogo} source={require('../resources/img/icon_transp.png')} />
            <Image style={styles.img} source={require('../resources/img/ic_round-menu.png')} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '15%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        flexDirection: 'row',
        paddingTop: 60,

        justifyContent: 'space-between'
    },
    containerBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 100
    },
    img: {
        width: 35,
        height: 35,
        marginLeft: 20,
        marginRight: 20,

    },
    imgInside: {
        width: 35,
        height: 35,

    },
    imgLogo: {
        width: 85,
        height: 85

    }
})

export default NavHeader;