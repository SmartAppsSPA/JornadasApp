import React from "react";
import { Image } from "react-native";

const MainImage = ({ props }) => {
  return (
    <Image
      source={require("../../../assets/Centro_Punta_Arenas.jpg")}
      style={{
        width: null,
        resizeMode: "contain",
        height: 220,
        marginBottom: 5,
        marginTop: -15,
        zIndex: -2,
      }}
    />
  );
};

export default MainImage;
