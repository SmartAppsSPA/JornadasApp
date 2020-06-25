import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import styles from "./Style";

const BonoScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header style={styles.header}>
        <Left>
          <Icon
            style={styles.icon}
            name="menu"
            onPress={() => props.navigation.openDrawer()}
          />
        </Left>
        <Right>
          <Image
            source={require("../../assets/logo_jornadas_leones.png")}
            style={{
              width: 200,
              resizeMode: "contain",
              height: 50,
              marginRight: -20,
            }}
          />
        </Right>
      </Header>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/slider_noticia_001.jpg")}
          style={{
            resizeMode: "contain",
            height: 220,
            marginBottom: 5,
          }}
        />
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.textTitle}>Bono Rifa</Text>
          </View>
          <Text style={styles.form}>Cantidad)</Text>
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
              <Text style={styles.textPagar}>Pagar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BonoScreen;
