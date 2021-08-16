import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../../Utils/Loading";
import * as firebase from "firebase";

export default (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);



  const time = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Home");
    }, 5000);
  };

    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/logo_jornadas.png")}
          style={{
            height: 100,
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />
        <Text style={styles.exito}>Su compra </Text>
        <Text style={styles.exito}>ha sido procesada con exito</Text>
        <FontAwesome name="check-square" size={50} color="green" />
        <Text style={styles.exito}>Gracias por colaborar con</Text>
        <Text style={styles.exito}>esta noble causa.</Text>
        <TouchableHighlight onPress={() => time()} style={styles.button}>
          <Text style={styles.textButton}>Volver al Inicio</Text>
        </TouchableHighlight>
        <Text style={styles.smartApps}>©{(new Date().getFullYear())} Powered by Smartapps</Text>
        <Loading isVisible={loading} text="Guardando información, no cierre la aplicación..." />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03255F",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#F5C300",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  textButton: {
    fontSize: 20,
    color: "#03255F",
    fontWeight: "bold",
  },
  exito: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  smartApps: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
});
