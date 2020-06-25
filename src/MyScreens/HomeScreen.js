import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import styles from "./Style";
import firebase from "../../Firebase/Firebase";

import MyButtons from "./MyButtons";

export default function HomeScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <Header style={styles.header}>
        <Left>
          <Icon
            style={styles.icon}
            name="menu"
            onPress={() => props.navigation.openDrawer()}
          />
        </Left>
        <Right>
          <Image
            source={require("../../assets/logo_jornadas_leones.png")}
            style={{
              width: 200,
              resizeMode: "contain",
              height: 50,
              marginRight: -20,
            }}
          />
        </Right>
      </Header>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/slider_noticia_001.jpg")}
          style={{
            resizeMode: "contain",
            height: 220,
            marginBottom: 5,
          }}
        />
        <View style={styles.bodyhome}>
          <View style={styles.buttonshome}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Donar")}
              style={styles.buttonYellow}
            >
              <Text style={styles.textCompany}>Alcancia Digital</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBlue}>
              <Text style={styles.textUsers}>Eventos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Bono")}
              style={styles.buttonYellow}
            >
              <Text style={styles.textCompany}>Comprar Bono Rifa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonshome}>
            <TouchableOpacity style={styles.buttonBlue}>
              <Text style={styles.textUsers}>Mis Donaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 110,
                height: 110,
                backgroundColor: "#F5C300",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
                marginLeft: 5,
                borderRadius: 100,
                borderColor: "#03255F",
                borderWidth: 5,
              }}
            >
              <Image
                source={require("../../assets/Cruz_de_malta.png")}
                style={{
                  resizeMode: "stretch",
                  height: 100,
                  width: 100,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBlue}>
              <Text style={styles.textUsers}>Mis Bonos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonshome}>
            <TouchableOpacity style={styles.buttonYellow}>
              <Text style={styles.textCompany}>
                <FontAwesome5 name="user-cog" size={25} color="#03255F" />
                {`\nPerfil`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBlue}>
              <Text style={styles.textUsers}>
                <FontAwesome name="gear" size={25} color="#F5C300" />
                {`\nOpciones`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Logout} style={styles.buttonYellow}>
              <Text style={styles.textCompany}>
                <Entypo name="log-out" size={25} color="#03255F" />
                {`\nLogOut`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const Logout = () => {
  firebase.auth().signOut();
};
