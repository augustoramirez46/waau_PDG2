import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const LoginPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, height: 100, alignContent: 'center' }}>
            <Text>Login</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default LoginPage;