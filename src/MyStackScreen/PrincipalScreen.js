import React, { useState, useRef } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { validateEmail } from "./validation";
import firebase from "../../Firebase/Firebase";
import Loading from "../Utils/Loading";
import Toast from "react-native-easy-toast";

export default function PrincipalScreen(props) {
  const toastRef = useRef();
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingR, setLoadingR] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    let errors = {};
    if (!formData.email.trim() || !formData.password) {
      if (!formData.password) errors.password = true;
      toastRef.current.show(
        "Debe Completar todos los campos para iniciar sesión"
      );
      if (!formData.email.trim()) errors.email = true;
      toastRef.current.show(
        "Debe Completar todos los campos para iniciar sesión"
      );
    } else if (!validateEmail(formData.email.trim())) {
      errors.email = true;
      toastRef.current.show("Correo electrónico incorrecto.");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email.trim(), formData.password)
        .then(() => {
          setLoading(false);
          console.log("OK");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("Usuario no encontrado, verifique sus datos.");
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

  const recuperarPassword = () => {
    const email = formData.email;
    setLoadingR(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoadingR(false);
        toastRef.current.show(
          "Se le ha enviado un correo, por favor siga los pasos.  "
        );
      })
      .catch(() => {
        setLoadingR(false);
        toastRef.current.show("Correo electrónico no encontrado.");
      });
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.logoContainer}>
      <View style={styles.userContainer}>
						<Image
							source={require("../../assets/logo_jornadas.png")}
							style={styles.logo}
						/>
					</View>
      </View>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputUnderContainer}
          autoCapitalize="none"
          placeholder="Correo electrónico"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, "email")}
          rightIcon={
            formError.email ? (
              <Icon type="font-awesome" name="exclamation-circle" color="red" />
            ) : (
              <Icon
                type="material-community"
                name="at"
                iconStyle={styles.iconRight}
              />
            )
          }
        />
        <Input
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputUnderContainer}
          autoCapitalize="none"
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={showPassword ? false : true}
          onChange={(e) => onChange(e, "password")}
          rightIcon={
            formError.password ? (
              <Icon type="font-awesome" name="exclamation-circle" color="red" />
            ) : (
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setShowPassword(!showPassword)}
              />
            )
          }
        />
      </View>
      <TouchableOpacity onPress={login} style={styles.buttonLogin}>
        <Text style={styles.text}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Register")}
        style={styles.buttonRegistrarse}
      >
        <Text style={styles.text}>Registrarse</Text>
      </TouchableOpacity>
      <Text onPress={recuperarPassword} style={styles.recuperar}>
        ¿Olvidaste tu contraseña?{" "}
      </Text>
      <Text style={styles.smartApps}>
        ©{new Date().getFullYear()} Powered by Smartapps
      </Text>
      <Loading isVisible={loading} text="Iniciando Sesión" />
      <Loading isVisible={loadingR} text="Pocesando Solicitud..." />

      <Toast
        ref={toastRef}
        position="center"
        style={{ backgroundColor: "#696969", opacity: 0.9, borderRadius: 20 }}
        fadeInduration={1000}
        fadeOutDuration={1000}
        textStyle={{ fontWeight: "bold", color: "#FFF", textAlign: "center" }}
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#03255F",
    height: "100%",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 75,
    backgroundColor: "#03255F",
    marginBottom: 20,
    width: 300,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: "stretch",
    marginBottom: 15,
    marginTop: 50,
  },
  inputContainer: {
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  input: {
    width: 250,
    backgroundColor: "#FFF",
    margin: 8,
    borderRadius: 20,
  },
  inputText: {
    fontSize: 12,
    color: "#03255F",
    fontWeight: "bold",
  },
  inputUnderContainer: {
    borderBottomWidth: 0,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  text: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  buttonLogin: {
    backgroundColor: "blue",
    width: 250,
    height: 30,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonRegistrarse: {
    width: 250,
    height: 30,
    backgroundColor: "#28a745",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  recuperar: {
    color: "#c1c1c1",
    marginTop: 10,
  },
  smartApps: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,
    textAlign: "center",
  },
  userContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		backgroundColor: "#03255F",
		marginBottom: 20,
		width: 200,
	  },
});
