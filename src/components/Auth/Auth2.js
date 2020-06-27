import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "./Style";

const Auth2 = ({ props }) => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../../assets/logo_jornadas.png")}
      />
    </View>
  );
};

export default Auth2;
