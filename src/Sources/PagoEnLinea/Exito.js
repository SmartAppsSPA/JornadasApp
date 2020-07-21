import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03255F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    textButton: {
        fontSize: 20,
        color: '#03255F',
        fontWeight: 'bold',
    },
    exito: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    smartApps: {
        fontSize: 10,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/logo_jornadas.png")}
                style={{
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 20,
                }}
            />
            <Text style={styles.exito}>
                Su aporte de $5000 CLP.
            </Text>
            <Text style={styles.exito}>
                ha sido recibido con exito
            </Text>
            <FontAwesome name='check-square' size={50} color='green' />
            <Text style={styles.exito}>
                Gracias por colaborar con
            </Text>
            <Text style={styles.exito}>
                esta noble causa.
            </Text>
            <TouchableHighlight onPress={() => props.navigation.navigate('Home')} style={styles.button}><Text style={styles.textButton}>Volver al Inicio</Text></TouchableHighlight>
            <Text style={styles.smartApps}>
                ©2020 Powered by Smartapps
            </Text>
        </View>
    )
}

