import React, { useState } from "react";
import { View, Image } from "react-native";
import styles from "./Style";

const Logo = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../assets/logo_jornadas.png")}
      />
    </View>
  );
};

export default Logo;
