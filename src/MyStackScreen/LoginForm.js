import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { validateEmail } from "./validation";
import firebase from "../../Firebase/Firebase";
import styles from "./Style";

const LoginForm = (props) => {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const [userLog, setUserLog] = useState(null);

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
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
      {userLog === "Personas" ? (
        <>
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
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.text}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserLog(null)}
            style={styles.button}
          >
            <Text style={styles.text}>Volver</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {userLog === null ? (
        <View style={styles.login}>
          <TouchableOpacity
            onPress={() => setUserLog("Personas")}
            style={styles.button}
          >
            <Text style={styles.text}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeForm} style={styles.button}>
            <Text style={styles.text}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default LoginForm;
