import React, { useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import BonoImage from "../components/Layouts/BonoImagen";
import usePreference from "../Hooks/usePreferences";
import { ScrollView } from "react-native-gesture-handler";
import { numberFormat } from '../Sources/PagoEnLinea/FormatPrice';

const BonoScreen = (props) => {
  const [cantidad, setCantidad] = useState(1);
  const precio = 500;
  const precioTotal = precio * cantidad;

  const { userFbData } = usePreference();

  const handleCantidad = (cantidad, max) => {
    if (cantidad >= 1) {
      setCantidad(cantidad);
      console.log(cantidad);
    } else if (cantidad < 0) {
      cantidad = 1;
      setCantidad(cantidad);
      console.log(cantidad);
    } else if (cantidad >= max) {
      cantidad = max;
      setCantidad(cantidad);
      console.log(cantidad);
    }
  };

  const handleReset = () => {
    setCantidad(1);
  };

  if (userFbData) {
    return (
      <View style={styles.mainView}>
        <HeaderView props={props} />
        <ScrollView>
          <BonoImage />
          <View></View>
          <View style={styles.textBoxBono}>
            <Text style={styles.titles}>Bono Sorteo Parcela</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.form}>Nombre(s)</Text>
            <TextInput
              name="nombre"
              style={styles.input}
              textContentType="name"
              placeholder="Ingrese Texto..."
              defaultValue={userFbData.nombre}
            />
            <Text style={styles.form}>Apellido(s)</Text>
            <TextInput
              name="apellido"
              textContentType="middleName"
              style={styles.input}
              placeholder="Ingrese Texto..."
              defaultValue={userFbData.apellido}
            />
            <Text style={styles.form}>Telefono</Text>
            <TextInput
              name="telefono"
              textContentType="telephoneNumber"
              style={styles.input}
              placeholder="Ingrese numero de contacto..."
            />
          </View>
          <View style={styles.textBoxCantidad}>
            <Text style={styles.cantidadText}>Cantidad</Text>
          </View>
          <View style={styles.quantity}>
            <TouchableHighlight
              onPress={() => handleCantidad(cantidad - 1)}
              style={styles.buttonLess}
            >
              <Text style={styles.signo}>-</Text>
            </TouchableHighlight>
            <Text style={styles.numero}>{cantidad}</Text>
            <TouchableHighlight
              onPress={() => handleCantidad(cantidad + 1)}
              style={styles.buttonPlus}
            >
              <Text style={styles.signo}>+</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.reset}>
            <TouchableHighlight
              onPress={() => handleReset(cantidad)}
              style={styles.buttonReset}
            >
              <Text style={styles.textReset}>Borrar</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              onPress={() => alert("ir a pagar")}
              style={styles.buttonPagar}
            >
              <Text style={styles.bonoSubmit}>
                {numberFormat(precioTotal)} Comprar
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default BonoScreen;
