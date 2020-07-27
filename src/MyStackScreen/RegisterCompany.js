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
  const [formCompanyData, setFormCompanytData] = useState(defaultCompanyValue);
  const [formErrorCom, setFormErrorCom] = useState({});

  const registerCompany = () => {
    let errors = {};
    if (
      !formCompanyData.nombreCom ||
      !formCompanyData.representante ||
      !formCompanyData.rutEmpresa ||
      !formCompanyData.email ||
      !formCompanyData.telefono ||
      !formCompanyData.password ||
      !formCompanyData.repeatPassword
    ) {
      if (!formCompanyData.nombreCom) errors.nombreCom = true;
      if (!formCompanyData.representante) errors.representante = true;
      if (!formCompanyData.rutEmpresa) errors.rutEmpresa = true;
      if (!formCompanyData.email) errors.email = true;
      if (!formCompanyData.telefono) errors.telefono = true;
      if (!formCompanyData.password) errors.password = true;
      if (!formCompanyData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formCompanyData.email)) {
      errors.email = true;
    } else if (formCompanyData.password !== formCompanyData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formCompanyData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          formCompanyData.email,
          formCompanyData.password
        )
        .then((user) => {
          firebase.auth().currentUser.updateProfile({
            displayName: formCompanyData.nombreCom,
          });
          let uid = user.user.uid;
          firebase
            .database()
            .ref()
            .child("Users/" + uid)
            .set({
              uid: uid,
              tipo: "Company",
              nombre: formCompanyData.nombreCom,
              representante: formCompanyData.representante,
              rutEmpresa: formCompanyData.rutEmpresa,
              telefono: formCompanyData.telefono,
              email: formCompanyData.email,
              password: formCompanyData.password,
            });
        })
        .catch(() => {
          setFormErrorCom({
            nombreCom: true,
            representante: true,
            rutEmpresa: true,
            email: true,
            telefono: true,
            password: true,
            repeatPassword: true,
          });
        });
    }

    setFormErrorCom(errors);
  };
  return (
    
      <View style={styles.background}>
        <Logo />
        <ScrollView>
        <TextInput
          style={[styles.input, formErrorCom.nombreCom && styles.error]}
          placeholder="Nombre o Razón Social"
          placeholderTextColor="#969696"
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              nombreCom: e.nativeEvent.text,
            })
          }
        />
        <TextInput
          style={[styles.input, formErrorCom.representante && styles.error]}
          placeholder="Representante Legal"
          placeholderTextColor="#969696"
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              representante: e.nativeEvent.text,
            })
          }
        />
        <TextInput
          style={[styles.input, formErrorCom.rutEmpresa && styles.error]}
          placeholder="Rut de La Empresa"
          placeholderTextColor="#969696"
          keyboardType='number-pad'
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              rutEmpresa: e.nativeEvent.text,
            })
          }
        />
        <TextInput
          style={[styles.input, formErrorCom.email && styles.error]}
          placeholder="Correo Electronico"
          placeholderTextColor="#969696"
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              email: e.nativeEvent.text,
            })
          }
        />
        <TextInput
          style={[styles.input, formErrorCom.telefono && styles.error]}
          placeholder="Teléfono De Contacto"
          placeholderTextColor="#969696"
          keyboardType='number-pad'
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              telefono: e.nativeEvent.text,
            })
          }
        />
        <TextInput
          style={[styles.input, formErrorCom.password && styles.error]}
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              password: e.nativeEvent.text,
            })
          }
        />
        <TextInput
          style={[styles.input, formErrorCom.repeatPassword && styles.error]}
          placeholder="Repetir Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) =>
            setFormCompanytData({
              ...formCompanyData,
              repeatPassword: e.nativeEvent.text,
            })
          }
        />
        <TouchableOpacity onPress={registerCompany} style={styles.buttonRegistrarse}>
          <Text style={styles.text}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Principal")}
          style={styles.button}
        >
          <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
  );
};

function defaultCompanyValue() {
  return {
    nombreCom: "",
    representante: "",
    rutEmpresa: "",
    email: "",
    telefono: "",
    password: "",
    repeatPassword: "",
  };
}
export default Register;
