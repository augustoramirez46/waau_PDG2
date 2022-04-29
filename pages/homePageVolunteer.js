import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavHeader from '../components/navHeader';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <NavHeader></NavHeader>
            <Text style={{ color: '#000', }}>Voluntario</Text>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default HomePage;