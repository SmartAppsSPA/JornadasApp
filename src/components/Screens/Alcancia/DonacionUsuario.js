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
            <Header style={styles.header}>
                <Left>
                    <Icon style={styles.icon} name="menu" onPress={() => props.navigation.openDrawer()} />
                </Left>
                <Right>
                    <Image
                        source={require("../../../assets/logo_jornadas.png")}
                        style={{
                            width: 200,
                            resizeMode: 'contain',
                            height: 50,
                            marginBottom: 10,
                            marginRight: -20,
                        }}
                    />
                </Right>
            </Header>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle} >
                            Aporte Personal
                    </Text>
                        <Text
                            style={styles.form}
                        >
                            Nombre(s)
                    </Text>
                        <TextInput
                            name='nombre'
                            style={styles.input}
                            textContentType='name'
                            placeholder='Ingrese Texto...'
                        />
                        <Text
                            style={styles.form}
                        >
                            Apellido(s)
                    </Text>
                        <TextInput
                            name='apellido'
                            textContentType='middleName'
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