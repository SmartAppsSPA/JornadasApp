import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Layouts/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../../../../Firebase/Firebase";
import { Input } from "react-native-elements";
import Loading from "../../../Utils/Loading";
import Toast from "react-native-easy-toast";
import moment from "moment";
import usePreference from "../../../Hooks/usePreferences";

export default function AsignarVarias(props) {
  const toastRef = useRef();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [errorForm, setErrorForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rut, setRut] = useState("");
  const [alcancias, setAlcancias] = useState([]);
  const { userFbData } = usePreference();
  const [disableButtonPlus, setDisabelButtonPlus] = useState(false);
  const [disableButtonLess, setDisabelButtonLess] = useState(false);
  let arrayAlcancias = [];

  useEffect(() => {
    firebase
      .database()
      .ref(`Users/${userFbData.uid}/alcancias/`)
      .on("value", (snapshot) => {
        snapshot.val().forEach((element) => {
          if (element.asignada_tercero == false) {
            arrayAlcancias.push(element);
          }
        });
        setAlcancias(arrayAlcancias);
      });
  }, []);

  useEffect(() => {
    cantidad == 1 ? setDisabelButtonLess(true) : setDisabelButtonPlus(false);
    cantidad == alcancias.length
      ? setDisabelButtonPlus(true)
      : setDisabelButtonPlus(false);
  }, [cantidad]);

  const handleCantidad = (opt) => {
    if (opt == +1) {
      if (opt >= 1) {
        if (cantidad == alcancias.length) {
          setCantidad(alcancias.length);
          setDisabelButtonPlus(true);
        } else {
          setDisabelButtonPlus(false);
          setDisabelButtonLess(false);
          setCantidad(cantidad + 1);
        }
      }
    } else if (opt == -1) {
      if (cantidad <= 1) {
        setDisabelButtonPlus(false);
        setDisabelButtonLess(true);
        opt = 1;
        setCantidad(opt);
      } else {
        setDisabelButtonPlus(false);
        setCantidad(cantidad - 1);
      }
    }
  };

  const submit = () => {
    let errors = {};
    if (!nombre || !direccion || !telefono) {
      toastRef.current.show("Debe Completar Todos Los campos obligatorios.");
      if (!nombre) (errors.nombre = true), console.log("ERROR1");
      if (!direccion) (errors.direccion = true), console.log("ERROR3");
      if (!telefono) (errors.telefono = true), console.log("ERROR4");
    } else {
      setLoading(true);
      for (let i = 0; i < cantidad; i++) {
        let key = alcancias[i].alcancia_numero - 1;
        let indice = alcancias[i].alcancia_numero + 1;
        asignarAlcancias(userFbData.uid, key, indice);
      }
    }
    setErrorForm(errors);
  };

  const asignarAlcancias = (uid, key, indice_alcancia) => {
    console.log("los de asignarAlcancias", uid, key, indice_alcancia);
    firebase
      .database()
      .ref()
      .child(`Users/${uid}/alcancias/${key}/`)
      .update({
        reset: false,
        asignada_tercero: true,
        fecha_asignacion: moment().format("DD-MM-YYYY h:mm:ss a"),
        tercero: {
          nombre: nombre,
          correo: correo,
          direccion: direccion,
          telefono: telefono,
          rut: rut,
        },
      });
    firebase
      .database()
      .ref()
      .child(`Alcancias/${indice_alcancia}/`)
      .update({
        reset: false,
        asignada_tercero: true,
        fecha_asignacion: moment().format("DD-MM-YYYY h:mm:ss a"),
        tercero: {
          nombre: nombre,
          correo: correo,
          direccion: direccion,
          telefono: telefono,
          rut: rut,
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        toastRef.current.show("Éxito al asignar ");
        handleReset();
        navigation.navigate("Alcancias");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toastRef.current.show("Algo anda mal, intenta nuevamente.");
      });
  };

  const handleReset = () => {
    setNombre("");
    setCorreo("");
    setDireccion("");
    setTelefono("");
    setRut("");
  };

if(alcancias != 0){
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Text style={styles.title}>Asignar alcancías</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Formulario entrega de Alcancía</Text>
          <Text style={styles.textKey}>Nombre y Apellido*</Text>
          <Input
            name="nombre"
            placeholder="Toque para escribir..."
            defaultValue={nombre}
            onChange={(e) => setNombre(e.nativeEvent.text)}
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputUnderContainer}
            rightIcon={
              errorForm.nombre ? (
                <Icon
                  type="FontAwesome5"
                  name="exclamation-circle"
                  color="red"
                />
              ) : null
            }
          />
          <Text style={styles.textKey}>Correo electrónico</Text>
          <Input
            name="correo"
            placeholder="Toque para escribir..."
            defaultValue={correo}
            onChange={(e) => setCorreo(e.nativeEvent.text)}
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputUnderContainer}
          />
          <Text style={styles.textKey}>Dirección*</Text>
          <Input
            name="direccion"
            placeholder="Ciudad, Calle #0000..."
            defaultValue={direccion}
            onChange={(e) => setDireccion(e.nativeEvent.text)}
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputUnderContainer}
            rightIcon={
              errorForm.nombre ? (
                <Icon
                  type="FontAwesome5"
                  name="exclamation-circle"
                  color="red"
                />
              ) : null
            }
          />
          <Text style={styles.textKey}>Teléfono*</Text>
          <Input
            name="telefono"
            keyboardType="phone-pad"
            placeholder="+56 9 1111 1111..."
            defaultValue={telefono}
            onChange={(e) => setTelefono(e.nativeEvent.text)}
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputUnderContainer}
            rightIcon={
              errorForm.nombre ? (
                <Icon
                  type="FontAwesome5"
                  name="exclamation-circle"
                  color="red"
                />
              ) : null
            }
          />
          <Text style={styles.textKey}>Rut</Text>
          <Input
            name="Rut"
            placeholder="1.111.111-1..."
            defaultValue={rut}
            onChange={(e) => setRut(e.nativeEvent.text)}
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputUnderContainer}
          />
          <View style={styles.quantityContainer}>
            <Text style={styles.titleCantidad}>Cantidad</Text>
            <View style={styles.quantity}>
              <TouchableOpacity
                disabled={disableButtonLess}
                onPress={() => handleCantidad(-1)}
                style={styles.plusLessBtn}
              >
                <Icon
                  type="material-community"
                  name="minus-circle"
                  color={disableButtonLess ? "grey" : "#03255F"}
                  size={35}
                  iconStyle={styles.less}
                />
              </TouchableOpacity>
              <Text style={styles.numero}>{cantidad}</Text>
              <TouchableOpacity
                disabled={disableButtonPlus}
                onPress={() => handleCantidad(+1)}
                style={styles.plusLessBtn}
              >
                <Icon
                  type="material-community"
                  name="plus-circle"
                  color={disableButtonPlus ? "grey" : "#03255F"}
                  size={35}
                  iconStyle={styles.plus}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={submit} style={styles.submitBtn}>
            <Text style={styles.textBtn}>Asignar</Text>
          </TouchableOpacity>
          <Text style={styles.note}> * Campos obligatorios. </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Alcancias")}
          style={styles.backButton}
          disabled=""
        >
          <Icon
            type="FontAwesome5"
            name="arrow-circle-left"
            size={40}
            color="#FFF"
          />
        </TouchableOpacity>
      </ScrollView>
      <Loading isVisible={loading} text="Asignando..." />
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
}else{
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Text style={styles.title}>Asignar alcancías</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Alcancias")}
          style={styles.backButton}
          disabled=""
        >
          <Icon
            type="FontAwesome5"
            name="arrow-circle-left"
            size={40}
            color="#FFF"
          />
        </TouchableOpacity>
        <Text style={styles.contentElse}>No existen alcancías disponibles</Text>
      </ScrollView>
      <Loading isVisible={loading} text="Asignando..." />
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

}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  title: {
    flex: 0.5,
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#34495E",
    borderRadius: 15,
    overflow: "hidden",
    height: 50,
    paddingTop: 12,
    paddingLeft: 0 ,
  },
  contentElse: {
    flex: 0.5,
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "#34495E",
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    height: 50,
    paddingTop: 12,
    paddingLeft: 0 ,
  },
  inputContainer: {
    flex: 5,
    marginVertical: 10,
    marginHorizontal: 50,
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#FFF",
    borderWidth: 1.5,
    overflow: "hidden",
    backgroundColor: "#D6DBDF",
  },
  subTitle: {
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#03255f",
    marginVertical: 10,
  },
  textKey: {
    marginLeft: 15,
    fontSize: 10,
    fontWeight: "bold",
    color: "#03255f",
    alignSelf: "flex-start",
  },
  input: {
    width: "95%",
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
  submitBtn: {
    marginVertical: 10,
    width: 100,
    height: 25,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#34495E",
    borderRadius: 20,
    borderColor: "#696969",
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  note: {
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    color: "red",
    marginBottom: 10,
  },
  backButton: {
    flex: 1,
    alignSelf: "flex-start",
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 15,
    position: "absolute",
  },
  quantityContainer: {
    flex: 2,
    backgroundColor: "#A9B4C0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34495E",
    marginTop: 10,
    marginBottom: 10,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  plus: {
    color: "#03255f",
  },
  less: {
    color: "#03255f",
  },
  numero: {
    width: 55,
    height: 45,
    fontSize: 30,
    color: "#03255f",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    paddingTop: 5,
  },
  titleCantidad: {
    fontSize: 20,
    color: "#03255F",
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
  },
  plusLessBtn: {
    marginTop: -5,
    marginHorizontal: 5,
  },
});
