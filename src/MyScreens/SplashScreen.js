import React, { useState, useEffect } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./Style";

const SplashScreen = (props) => {
  const [click, setClick] = useState(false);
  const goToScreen = (routeName) => {
    props.navigation.navigate(routeName);
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        goToScreen("Home");
      },
      !click ? 1000 : 1
    );
    return () => clearTimeout(timer);
  }, [!click]);

  return (
    <View style={styles.splashScreen} onTouchStart={() => setClick(!click)}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
      <Animatable.Image
        animation="pulse"
        easing="ease-in-expo"
        iterationCount="infinite"
        style={{ width: 300, height: 100, margin: 100 }}
        source={require("../../assets/logo_jornadas.png")}
      />
      <View style={[styles.containerStatus, styles.horizontal]}>
        <ActivityIndicator size="large" color="#F5C300" />
      </View>
    </View>
  );
};

export default SplashScreen;
