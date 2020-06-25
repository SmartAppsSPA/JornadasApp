import React from "react";
import { View, Text, Image, TouchableHighlight, TextInput } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";

const Donar = (props) => {
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
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.title}>
              <Text style={styles.textTitle}>Aporte Personal</Text>
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
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              onPress={() => alert("Apretaste este boton")}
              style={styles.buttonSubmit}
            >
              <Text style={styles.textSubmit}>Donar</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Donar;
