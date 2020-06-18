import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { Header, Icon, Left, Right } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container: {
        flex: 5,
    },
    header: {
        backgroundColor: "#03255F",
        height: 60,
    },
    icon: {
        color: 'white',
    },
    body: {
        flex: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        flex: 3,
    },
    title: {
        alignItems: "center",
        justifyContent: "center",
    },
    textTitle: {
        fontSize: 30,
        color: '#03255F',
        fontWeight: 'bold',
        paddingTop: 30,
    },
    form: {
        fontSize: 15,
        color: '#03255F',
        fontWeight: 'bold',
        paddingTop: 30,
    },
    input: {
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: 300,
    },
    buttons: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonSubmit: {
        marginTop: 15,
        width: 350,
        height: 50,
        backgroundColor: '#F5C300',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    facebook: {
        marginTop: 15,
        width: 350,
        height: 50,
        backgroundColor: '#4267B2',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    google: {
        marginTop: 15,
        width: 350,
        height: 50,
        backgroundColor: '#DB4437',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    textSubmit: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default (props) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle} >
                            Aporte Empresas
                    </Text>
                        <Text
                            style={styles.form}
                        >
                            Nombre o Razón Social:
                    </Text>
                        <TextInput
                            name='nombreRazonSocial'
                            textContentType='organizationName'
                            style={styles.input}
                            placeholder='Ingrese Texto...'
                        />
                        <Text
                            style={styles.form}
                        >
                            Rut De La Empresa:
                    </Text>
                        <TextInput
                            name='rutEmpresa'
                            style={styles.input}
                            placeholder='Ingrese Texto...'
                        />
                        <Text
                            style={styles.form}
                        >
                            Email:
                        </Text>
                        <TextInput
                            name='email'
                            textContentType='emailAddress'
                            style={styles.input}
                            placeholder='Ingrese Texto...'
                        />
                        <Text
                            style={styles.form}
                        >
                            Teléfono De Contacto:
                    </Text>
                        <TextInput
                            name='Telefono'
                            style={styles.input}
                            placeholder='Ingrese Texto...'
                        />
                        <Text
                            style={styles.form}
                        >
                            Su Aporte
                    </Text>
                        <TextInput
                            name='aporte'
                            style={styles.input}
                            placeholder='Ingrese Aporte...'
                        />
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={() => alert('Apretaste este boton')} style={styles.buttonSubmit}><Text style={styles.textSubmit}>Donar</Text></TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    );
};