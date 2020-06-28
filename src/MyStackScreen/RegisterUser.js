import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { validateEmail } from "./validation";
import firebase from "../../Firebase/Firebase";
import styles from "./Style";
import Logo from "./Logo";

const Register = (props) => {
  const [formUserData, setFormUserData] = useState(defaultUserValue);
  const [formError, setFormError] = useState({});

  const registerUser = () => {
    let errors = {};
    if (
      !formUserData.nombre ||
      !formUserData.apellido ||
      !formUserData.email ||
      !formUserData.password ||
      !formUserData.repeatPassword
    ) {
      if (!formUserData.nombre) errors.nombre = true;
      if (!formUserData.apellido) errors.apellido = true;
      if (!formUserData.email) errors.email = true;
      if (!formUserData.password) errors.password = true;
      if (!formUserData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formUserData.email)) {
      errors.email = true;
    } else if (formUserData.password !== formUserData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formUserData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          formUserData.email,
          formUserData.password
        )
        .then((user) => {
          firebase.auth().currentUser.updateProfile({
            displayName: formUserData.nombre,
          });
          let uid = user.user.uid;
          firebase
            .database()
            .ref()
            .child("Users/" + uid)
            .set({
              uid: uid,
              tipo: "User",
              nombre: formUserData.nombre,
              apellido: formUserData.apellido,
              email: formUserData.email,
              password: formUserData.password,
            });
        })
        .catch(() => {
          setFormError({
            nombre: true,
            apellido: true,
            email: true,
            password: true,
            repeatPassword: true,
          });
        });
    }

    setFormError(errors);
    console.log(errors);
  };

  return (
    <ScrollView>
      <View style={styles.background}>
        <Logo />
        <TextInput
          style={[styles.input, formError.nombre && styles.error]}
          placeholder="Nombre(s)"
          placeholderTextColor="#969696"
          onChange={(e) =>
            setFormUserData({ ...formUserData, nombre: e.nativeEvent.text })
          }
        />
        <TextInput
          style={[styles.input, formError.apellido && styles.error]}
          placeholder="Apellido(s)"
          placeholderTextColor="#969696"
          onChange={(e) =>
            setFormUserData({ ...formUserData, apellido: e.nativeEvent.text })
          }
        />
        <TextInput
          style={[styles.input, formError.email && styles.error]}
          placeholder="Correo Electronico"
          placeholderTextColor="#969696"
          onChange={(e) =>
            setFormUserData({ ...formUserData, email: e.nativeEvent.text })
          }
        />
        <TextInput
          style={[styles.input, formError.password && styles.error]}
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) =>
            setFormUserData({ ...formUserData, password: e.nativeEvent.text })
          }
        />
        <TextInput
          style={[styles.input, formError.repeatPassword && styles.error]}
          placeholder="Repetir Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) =>
            setFormUserData({
              ...formUserData,
              repeatPassword: e.nativeEvent.text,
            })
          }
        />
        <TouchableOpacity onPress={registerUser} style={styles.button}>
          <Text style={styles.text}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Principal")}
          style={styles.button}
        >
          <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function defaultUserValue() {
  return {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export default Register;
