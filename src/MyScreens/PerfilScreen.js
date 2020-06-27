import React from "react";
import { View, Text } from "react-native";
import MyButtons from "./MyButtons";
import HeaderView from "../components/Layouts/Header";

export default function PerfilScreen({ props }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderView props={props} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>perfil Screen</Text>
        <MyButtons nombre="ir a Notificacion" destino="Notificacion" />
      </View>
    </View>
  );
}
