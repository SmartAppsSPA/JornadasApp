import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { validateEmail } from "./validation";
import firebase from "../../Firebase/Firebase";
import styles from "./Style";
import Logo from "./Logo";

const PrincipalScreen = (props) => {
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.password) errors.password = true;
      console.log("ERROR 1");
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
      console.log("ERROR 2");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("OK");
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  function defaultValue() {
    return {
      email: "",
      password: "",
    };
  }

  return (
    <View style={styles.background}>
      <Logo />
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo Electronico"
        placeholderTextColor="#969696"
        onChange={(e) => onChange(e, "email")}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => onChange(e, "password")}
      />
      <TouchableOpacity onPress={login} style={styles.buttonLogin}>
        <Text style={styles.text}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Register")}
        style={styles.buttonRegistrarse}
      >
        <Text style={styles.text}>Registrarse</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "white",
            marginLeft: 60,
          }}
        />
        <View>
          <Text style={{ width: 50, textAlign: "center", color: "white" }}>
            O
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "white",
            marginRight: 60,
          }}
        />
      </View>
      <TouchableOpacity style={styles.buttonGoogle}>
        <Text style={styles.textRedes}>Iniciar Sesión Con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button}>
        <Text style={styles.text}>Ingresar como invitado</Text>
      </TouchableOpacity>
      <Text style={styles.smartApps}>©2020 Powered by Smartapps</Text>
    </View>
  );
};

export default PrincipalScreen;
