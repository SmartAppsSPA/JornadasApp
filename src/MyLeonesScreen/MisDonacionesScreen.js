import React from "react";
import { View, Text } from "react-native";
import styles from "../Utils/Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";

const MisDonaciones = (props) => {
  return (
    <View style={styles.mainView}>
      <HeaderView props={props} />
      <MainImage />
        <View>
          <Text style={styles.titles}>Mis Donaciones</Text>
        </View>
    </View>
  );
};

export default MisDonaciones;
