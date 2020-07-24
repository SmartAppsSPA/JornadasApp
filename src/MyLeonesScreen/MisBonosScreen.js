import React from "react";
import { View, Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../Utils/Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";

const MisBonos = (props) => {
  return (
    <View style={styles.mainView}>
      <HeaderView props={props} />
      <MainImage />
      <ScrollView>
        <View>
          <Text style={styles.titles}>Mis Bonos</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MisBonos;
