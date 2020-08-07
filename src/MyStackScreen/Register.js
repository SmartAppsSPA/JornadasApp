import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView } from "react-native";
import Logo from "./Logo";

export default function Register(props){
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.logoContainer}>
      <Logo />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("RegisterUser")}
        style={styles.buttonRegistrarse}
      >
        <Text style={styles.text}>Personas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("RegisterCompany")}
        style={styles.buttonRegistrarse}
      >
        <Text style={styles.text}>Empresas</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => props.navigation.navigate("Principal")}
          style={styles.button}
        >
          <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#03255F",
    height: "100%",
    alignItems: "center",
  },
  logoContainer:{
    marginTop: 125,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  text: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
	buttonRegistrarse: {
		width: 250,
		height: 30,
		backgroundColor: "#28a745",
    alignItems: "center",
    alignSelf: 'center',
		justifyContent: "center",
		marginTop: 5,
		marginBottom: 5,
		borderRadius: 10,
		borderWidth: 1,
	},
	button: {
		width: 250,
		height: 30,
		backgroundColor: "#F5C300",
    alignItems: "center",
    alignSelf: 'center',
		justifyContent: "center",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
	},
})
