import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as RootNavigation from "./RootNavigation.js";

export default function MyButtons({ nombre, destino }) {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        width: 200,
        height: 50,
        backgroundColor: "#ff5204",
        alignContent: "center",
        alignItems: "center",
        paddingTop: 10,
        borderRadius: 5,
      }}
      onPress={() => RootNavigation.navigate(destino)}
    >
      <Text style={{ color: "#fff", fontSize: 20 }}>{nombre}</Text>
    </TouchableOpacity>
  );
}
