import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";

const Donar = (props) => {
  
  return (
    <View style={styles.mainView}>
      <HeaderView props={props} />
      <MainImage />
      <ScrollView>
        <View>
          <Text style={styles.titles}>Aporte Personal</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.form}>Nombre(s)</Text>
          <TextInput
            name="nombre"
            style={styles.input}
            textContentType="name"
            placeholder="Ingrese Texto..."
          />
          <Text style={styles.form}>Apellido(s)</Text>
          <TextInput
            name="apellido"
            textContentType="middleName"
            style={styles.input}
            placeholder="Ingrese Texto..."
          />
          <Text style={styles.form}>Su Aporte</Text>
          <TextInput
            name="aporte"
            style={styles.input}
            placeholder="Ingrese Aporte..."
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
