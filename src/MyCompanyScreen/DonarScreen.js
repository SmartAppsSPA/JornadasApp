import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";
import usePreference from '../Hooks/usePreferences'

const Donar = (props) => {

  const {userFbData} = usePreference()
  console.log(userFbData)
  return (
    <View style={styles.mainView}>
      <HeaderView props={props} />
      <MainImage />
      <ScrollView>
        <View>
          <Text style={styles.titles}>Aporte Empresa</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.form}>Nombre(s)</Text>
          <TextInput
            name="nombre"
            style={styles.input}
            textContentType='username'
            placeholder="Ingrese Texto..."
            defaultValue={userFbData.nombre}
            editable={false}
          />
          <Text style={styles.form}>Rut De La Empresa</Text>
          <TextInput
            name="rutEmpresa"
            textContentType='telephoneNumber'
            style={styles.input}
            placeholder="Ingrese Texto..."
            defaultValue={userFbData.rutEmpresa}
            editable={false}
          />
          <Text style={styles.form}>Email</Text>
          <TextInput
            name="email"
            style={styles.input}
            textContentType='emailAddress'
            placeholder="Ingrese Texto..."
            defaultValue={userFbData.email}
            editable={false}
          />
          <Text style={styles.form}>Telefono De Contacto</Text>
          <TextInput
            name="telefono"
            style={styles.input}
            textContentType='telephoneNumber'
            placeholder="Ingrese Texto..."
            defaultValue={userFbData.telefono}
          />
          <Text style={styles.form}>Nombre De Contacto</Text>
          <TextInput
            name="Contacto"
            style={styles.input}
            textContentType='nickname'
            placeholder="Ingrese Texto..."
            defaultValue={userFbData.representante}
          />
          <Text style={styles.form}>Aporte</Text>
          <TextInput
            name="aporte"
            textContentType='telephoneNumber'
            style={styles.input}
            placeholder="Ingrese Aporte..."
            keyboardType='number-pad'
          />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
            onPress={() => alert("Apretaste este boton")}
            style={styles.buttonPagar}
          >
            <Text style={styles.textSubmit}>Donar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

export default Donar;
