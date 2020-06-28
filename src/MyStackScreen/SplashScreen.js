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
        goToScreen("Principal");
      },
      !click ? 5000 : 1
    );
    return () => clearTimeout(timer);
  }, [!click]);

  //console.log(click);
  //console.log(props.route.name);
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
