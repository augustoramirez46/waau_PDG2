import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#000', }}>Pruebis</Text>
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