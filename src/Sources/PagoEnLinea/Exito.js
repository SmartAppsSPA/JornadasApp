import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../../Utils/Loading";
import * as firebase from "firebase";

export default (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [payInfo, setPayInfo] = useState(null);
  const orden_de_compra = props.route.params.orden_de_compra;

  useEffect(() => {
    firebase
      .database()
      .ref(`Transbank/orden_${orden_de_compra}`)
      .on("value", (snapshot) => {
        setPayInfo(snapshot.val());
      });
  }, [orden_de_compra]);

  console.log(orden_de_compra);

  const time = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Home");
    }, 10000);
  };

  if (payInfo) {
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
        <Text style={styles.exito}>Su aporte por ${payInfo.aporte}</Text>
        <Text style={styles.exito}>
          ha sido {payInfo.estado_de_pago} con exito
        </Text>
        <FontAwesome
          name="check-square"
          size={50}
          color="green"
          style={{ margin: 10 }}
        />
        <Text style={styles.exito}>Gracias</Text>
        <Text style={styles.exito}>
          {payInfo.nombre} {payInfo.apellido}
        </Text>
        <Text style={styles.exito}>por colaborar con esta noble causa.</Text>
        <TouchableHighlight onPress={() => time()} style={styles.button}>
          <Text style={styles.textButton}>Volver al Inicio</Text>
        </TouchableHighlight>
        <Text
          onPress={() => Linking.openURL("http://smartapps.cl")}
          style={styles.smartApps}
        >
          ©2020 Powered by Smartapps
        </Text>
        <Loading isVisible={loading} text="Guardando información, no cierre la aplicación..." />
      </View>
    );
  } else {
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
        <Text style={styles.exito}>Su aporte</Text>
        <Text style={styles.exito}>ha sido recibido con exito</Text>
        <FontAwesome name="check-square" size={50} color="green" />
        <Text style={styles.exito}>Gracias por colaborar con</Text>
        <Text style={styles.exito}>esta noble causa.</Text>
        <TouchableHighlight onPress={() => time()} style={styles.button}>
          <Text style={styles.textButton}>Volver al Inicio</Text>
        </TouchableHighlight>
        <Text style={styles.smartApps}>©2020 Powered by Smartapps</Text>
        <Loading isVisible={loading} text="Guardando información, no cierre la aplicación..." />
      </View>
    );
  }
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
