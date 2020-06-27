import React from "react";
import { View, Text } from "react-native";
import MyButtons from "./MyButtons";
import HeaderView from "../components/Layouts/Header";

export default function NotificacionScreen({ props }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <HeaderView />
      <Text style={{ fontSize: 20 }}>Notificacion Screen</Text>
      <MyButtons nombre="ir a Home" destino="Home" />
    </View>
  );
}
