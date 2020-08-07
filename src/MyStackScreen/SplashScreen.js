import React, { useState, useEffect } from "react";
import { View, StatusBar, ActivityIndicator, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

export default function SplashScreen(props){
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

  return (
    <View style={styles.splashScreen} onTouchStart={() => setClick(!click)}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
      <Animatable.Image
        animation="pulse"
        easing="ease-in-expo"
        iterationCount="infinite"
        style={{ width: 300, height: 100, marginTop:300 }}
        source={require("../../assets/logo_jornadas.png")}
      />
      <View style={[styles.containerStatus, styles.horizontal]}>
        <ActivityIndicator size="large" color="#F5C300" />
      </View>
      <Text style={styles.smartApps}>©2020 Powered by Smartapps</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#03255F",
  },
  smartApps: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    marginBottom: 75,
   textAlign: 'center',
  },
  containerStatus: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
})

