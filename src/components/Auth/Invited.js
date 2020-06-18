import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const Invitado = () => {

    return (
        <View>
            <TouchableHighlight style={styles.button}><Text style={styles.text}>Continuar como invitado</Text></TouchableHighlight>
        </View >
    )
}

export default Invitado

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});