import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { Header, Left, Right, Icon } from "native-base";

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
        flex: 1,
    },
    textTitle: {
        fontSize: 40,
        color: '#03255F',
        fontWeight: 'bold',
        paddingTop: 30,
    },
    buttons: {
        flex: 2,
        flexDirection: 'row',

    },
    buttonUser: {
        width: 100,
        height: 100,
        backgroundColor: '#03255F',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginRight: 5,
    },
    buttonCompany: {
        width: 100,
        height: 100,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 5,

    },
    textUsers: {
        fontSize: 20,
        color: '#F5C300',
        fontWeight: 'bold',
    },
    textCompany: {
        fontSize: 20,
        color: '#03255F',
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
            <Image
                source={require("../../../assets/slider_noticia_001.jpg")}
                style={{
                    width: null,
                    resizeMode: "contain",
                    height: 220,
                    marginBottom: 5,
                    marginTop: -15,
                    zIndex: -2,
                }}
            />
            <View style={styles.body}>
                <View style={styles.title}>
                    <Text style={styles.textTitle} >
                        LogIn
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={() => alert('Apretaste este boton')} style={styles.buttonUser}><Text style={styles.textUsers}>Personas</Text></TouchableHighlight>
                    <TouchableHighlight onPress={() => alert('Apretaste este boton')} style={styles.buttonCompany}><Text style={styles.textCompany}>Empresas</Text></TouchableHighlight>
                </View>
            </View>
        </View>
    );
};
