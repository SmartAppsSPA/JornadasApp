import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { Header, Icon, Left, Right } from "native-base";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import firebase from '../../../../Firebase/Firebase';

export default Home = (props) => {
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
                <View style={styles.buttons}>
                    <TouchableHighlight style={styles.buttonYellow}><Text style={styles.textCompany}>Alcancia Digital</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.buttonBlue}><Text style={styles.textUsers}>Eventos</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.buttonYellow}><Text style={styles.textCompany}>Comprar Bono Rifa</Text></TouchableHighlight>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight style={styles.buttonBlue}><Text style={styles.textUsers}>Mis Donaciones</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.buttonYellow}><Image
                        source={require("../../../../assets/Cruz_de_malta.png")}
                        style={{
                            resizeMode: 'stretch',
                            height: 100,
                            width: 100,
                        }}
                    /></TouchableHighlight>
                    <TouchableHighlight style={styles.buttonBlue}><Text style={styles.textUsers}>Mis Bonos</Text></TouchableHighlight>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight style={styles.buttonYellow}><Text style={styles.textCompany}><FontAwesome5 name='user-cog' size={25} color='#03255F' />{`\nPerfil`}</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.buttonBlue}><Text style={styles.textUsers}><FontAwesome name='gear' size={25} color='#F5C300' />{`\nOpciones`}</Text></TouchableHighlight>
                    <TouchableHighlight onPress={Logout} style={styles.buttonYellow}><Text style={styles.textCompany}><Entypo name='log-out' size={25} color='#03255F' />{`\nLogOut`}</Text></TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const Logout = () => {
    firebase.auth().signOut();
};

const styles = StyleSheet.create({
    container: {
        flex: 6,
    },
    header: {
        backgroundColor: "#03255F",
        height: 60,
    },
    icon: {
        color: 'white',
    },
    imageContainer: {
        flex: 3,
    },
    body: {
        flex: 6,
        alignItems: "center",
    },
    buttons: {
        flex: 2,
        flexDirection: 'row',

    },
    buttonBlue: {
        width: 110,
        height: 110,
        backgroundColor: '#03255F',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 3,
        marginLeft: 5,
    },
    buttonYellow: {
        width: 110,
        height: 110,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
    },
    textUsers: {
        fontSize: 20,
        color: '#F5C300',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    textCompany: {
        fontSize: 20,
        color: '#03255F',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
});