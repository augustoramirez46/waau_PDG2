import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import { setStatusBarHidden } from 'expo-status-bar'

// Video
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';

import { Ionicons } from '@expo/vector-icons';

// Styles
import { Fonts, FontsSizes } from "../../../config/useFonts.js";

const VideoTabCourse = () => {
    const [inFullscreen, setInFullsreen] = useState(false);
    const [inFullscreen2, setInFullsreen2] = useState(false);
    const refVideo = useRef(null);
    const refVideo2 = useRef(null);
    const refScrollView = useRef(null);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cursos</Text>
            <View style={styles.finderContainer}>
                <Ionicons
                    name='search'
                    color={"#cecece"}
                    size={25}
                />
                <Text style={styles.finderText}>
                    Busca cursos & lecciones
                </Text>
            </View>
            <VideoPlayer
                videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    },
                    useNativeControls: true,
                    ref: refVideo2,
                }}
                fullscreen={{
                    inFullscreen: inFullscreen2,
                    enterFullscreen: async () => {
                        setStatusBarHidden(true, 'fade')
                        setInFullsreen2(!inFullscreen2)
                        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
                        refVideo2.current.setStatusAsync({
                            shouldPlay: true,
                        })
                    },
                    exitFullscreen: async () => {
                        setStatusBarHidden(false, 'fade')
                        setInFullsreen2(!inFullscreen2)
                        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
                    },
                }}
                style={{
                    height: inFullscreen2 ? Dimensions.get('window').width : 160,
                    width: inFullscreen2 ? Dimensions.get('window').height : 320,
                    videoBackgroundColor: '#cfcfcf',


                }}
            />
        </ScrollView>
    )
}

export default VideoTabCourse;

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
    finderText: {
        fontFamily: Fonts.Poppins.Regular,
        fontSize: FontsSizes.paragraph,
        color: '#cecece',
        marginLeft: 10,
        paddingTop: 2

    }
})