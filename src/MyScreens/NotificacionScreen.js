import React from "react";
import { View, Text } from "react-native";
import MyButtons from "./MyButtons";

export default function NotificacionScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Notificacion Screen</Text>
      <MyButtons nombre="ir a Home" destino="Home" />
    </View>
  );
}
