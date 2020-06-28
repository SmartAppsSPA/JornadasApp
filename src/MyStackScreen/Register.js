import React from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import Logo from "./Logo";

const Register = (props) => {
  return (
    <View style={styles.background}>
      <Logo />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("RegisterUser")}
        style={styles.button}
      >
        <Text style={styles.text}>Personas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("RegisterCompany")}
        style={styles.button}
      >
        <Text style={styles.text}>Empresas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
