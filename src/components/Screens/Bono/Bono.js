import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, TextBase } from "react-native";
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
    buttonPagar: {
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
    textPagar: {
        fontSize: 20,
        color: '#03255F',
        fontWeight: 'bold',
    },
    buttonPlus: {
        width: 25,
        height: 25,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    buttonLess: {
        width: 25,
        height: 25,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    quantity: {
        flexDirection: 'row',
    },
    form: {
        fontSize: 25,
        color: '#03255F',
        fontWeight: 'bold',
        paddingTop: 30,
    },
    numero: {
        width: 25,
        height: 25,
        fontSize: 15,
        color: '#03255F',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    input: {
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: 300,
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
                        source={require("../../../../assets/logo_jornadas.png")}
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
                source={require("../../../../assets/slider_noticia_001.jpg")}
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
                        Bono Rifa
                    </Text>
                </View>
                <Text
                    style={styles.form}
                >
                    Bono(s)
                    </Text>
                <View style={styles.quantity}>
                    <TouchableHighlight onPress={() => alert('Apretaste este boton')} style={styles.buttonLess}><Text style={styles.numero}>-</Text></TouchableHighlight>
                    <Text style={styles.numero}>1</Text>
                    <TouchableHighlight onPress={() => alert('Apretaste este boton')} style={styles.buttonPlus}><Text style={styles.numero}>+</Text></TouchableHighlight>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={() => alert('Apretaste este boton')} style={styles.buttonPagar}><Text style={styles.textPagar}>Pagar</Text></TouchableHighlight>
                </View>
            </View>
        </View>
    );
};
