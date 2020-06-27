import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";

const BonoScreen = (props) => {
  return (
    <View style={styles.container}>
      <HeaderView props={props} />
      <MainImage />
      <View></View>
      <View style={styles.textBoxBono}>
        <Text style={styles.titles}>Bono Rifa</Text>
        <Text style={styles.form}>Cantidad</Text>
      </View>
      <View style={styles.quantity}>
        <TouchableHighlight
          onPress={() => alert("Apretaste este boton")}
          style={styles.buttonLess}
        >
          <Text style={styles.numero}>-</Text>
        </TouchableHighlight>
        <Text style={styles.numero}>1</Text>
        <TouchableHighlight
          onPress={() => alert("Apretaste este boton")}
          style={styles.buttonPlus}
        >
          <Text style={styles.numero}>+</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.buttons}>
        <TouchableHighlight
          onPress={() => alert("Apretaste este boton")}
          style={styles.buttonPagar}
        >
          <Text style={styles.textSubmit}>Pagar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default BonoScreen;
