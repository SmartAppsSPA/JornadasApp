import React from "react";
import { View, Text } from "react-native";
import MyButtons from "./MyButtons";

export default function PerfilScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>perfil Screen</Text>
      <MyButtons nombre="ir a Notificacion" destino="Notificacion" />
    </View>
  );
}
