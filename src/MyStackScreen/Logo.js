import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Logo (){
  return (
    <View>
      <Image
        style={[styles.logo]}
        source={require("../../assets/logo_jornadas.png")}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
    resizeMode: "center",
    marginBottom: 15,
    marginTop:50,
  },
})
