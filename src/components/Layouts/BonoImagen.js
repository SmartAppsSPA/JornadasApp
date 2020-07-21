import React from "react";
import { Image } from "react-native";

const BonoImage = ({ props }) => {
  return (
    <Image
      source={{uri:"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2FSorteo_bono.png?alt=media&token=09016733-f591-4d85-a8cf-da62ab885862"}}
      style={{
        width: null,
        resizeMode: "contain",
        height: 220,
        marginTop: -15,
      }}
    />
  );
};

export default BonoImage;
