import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { validateEmail } from "./validation";
import firebase from "../../../Firebase/Firebase";
import styles from "./Style";

const RegisterForm = (props) => {
  const { changeForm } = props;
  const [formUserData, setFormUserData] = useState(defaultUserValue);
  const [formCompanyData, setFormCompanytData] = useState(defaultCompanyValue);
  const [formError, setFormError] = useState({});
  const [formErrorCom, setFormErrorCom] = useState({});
  const [userType, setUserType] = useState(null);

  console.log(userType);

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
            .child("Company/" + uid)
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
    <>
      {userType === "Personas" ? (
        <>
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
            onPress={() => setUserType(null)}
            style={styles.button}
          >
            <Text style={styles.text}>Volver</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {userType === "Empresas" ? (
        <>
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
          <TouchableOpacity onPress={registerCompany} style={styles.button}>
            <Text style={styles.text}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType(null)}
            style={styles.button}
          >
            <Text style={styles.text}>Volver</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {userType === null ? (
        <View style={styles.login}>
          <TouchableOpacity
            onPress={() => setUserType("Personas")}
            style={styles.button}
          >
            <Text style={styles.text}>Personas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("Empresas")}
            style={styles.button}
          >
            <Text style={styles.text}>Empresas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeForm} style={styles.button}>
            <Text style={styles.text}>Volver</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
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
export default RegisterForm;
