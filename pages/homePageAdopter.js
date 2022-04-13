import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



const HomePageAdopter = ({ navigation }) => {

    const handleConstNavigate = () => {
        navigation.navigate("Form")
    }
    return (
        <View style={styles.container}>
            <Text style={{ color: '#000', }}>Adoptante</Text>
            <TouchableOpacity
                onPress={handleConstNavigate}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Ir al formulario</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#FF7B36',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'

    },
});
export default HomePageAdopter;