import React, { useState } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";
import {formatPrice} from '../Sources/PagoEnLinea/FormatPrice';

const BonoScreen = (props) => {

  const [cantidad, setCantidad] = useState(1);
  const precio = 500
  const precioTotal = precio * cantidad

  const handleCantidad = (cantidad, max) => {
    if (cantidad >= 1 ) {
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

  const handleReset = (cantidad)=>{
    setCantidad(1)
  }

  return (
    <View style={styles.mainView}>
      <HeaderView props={props} />
      <MainImage />
      <View></View>
      <View style={styles.textBoxBono}>
        <Text style={styles.titles}>Bono Sorteo Parcela</Text>
        <Text style={styles.form}>Cantidad</Text>
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
          onPress={()=>handleCantidad(cantidad + 1)}
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
          onPress={() => alert('ir a pagar')}
          style={styles.buttonPagar}
        >
          <Text style={styles.textSubmit}>{formatPrice(precioTotal)}Comprar</Text>  
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default BonoScreen;
