import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";
import firebase from '../../Firebase/Firebase';
import usePreference from '../Hooks/usePreferences'


export default function HomeScreen(props) {

  const {userFbData} = usePreference()

  return(
      <View style={styles.mainView}>
        <HeaderView props={props} />
        <MainImage />
        <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          <View style={styles.bodyHome}>
            <View style={styles.buttonsHome}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Donar")}
                style={styles.buttonYellow}
              >
                <Text style={styles.textCompany}>Alcancia Digital</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Eventos", userFbData={userFbData} )}
                style={styles.buttonBlue}
              >
                <Text style={styles.textUsers}>Eventos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Bono")}
                style={styles.buttonYellow}
              >
                <Text style={styles.textCompany}>Bono Sorteo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsHome}>
              <TouchableOpacity onPress={() => props.navigation.navigate("Mis Donaciones")}  style={styles.buttonBlue}>
                <Text style={styles.textUsers}>Mis Donaciones</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 110,
                  height: 110,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 5,
                  marginRight: 5,
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
              <TouchableOpacity  onPress={() => props.navigation.navigate("Mis Bonos")} style={styles.buttonBlue}>
                <Text style={styles.textUsers}>Mis Bonos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsHome}>
              <TouchableOpacity style={styles.buttonYellow}>
                <Text style={styles.textCompany}>
                  <Icon name="users" size={25} color="#03255F" />
                  {`\nPerfil`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonBlue}>
                <Text style={styles.textUsers}>
                  <Icon name="tools" size={25} color="#F5C300" />
                  {`\nOpciones`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={Logout} style={styles.buttonYellow}>
                <Text style={styles.textCompany}>
                  <Icon name="door-open" size={25} color="#03255F" />
                  {`\nCerrar Sesión`}
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
