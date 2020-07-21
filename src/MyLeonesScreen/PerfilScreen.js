import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Styles from './Style'
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";

const PerfilScreen = (props) => {
  return (
    <View style={Styles.mainView}>
      <HeaderView props={props} />
      <MainImage />
      <ScrollView>
        <View>
          <Text style={Styles.titles}>Perfil Screen</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PerfilScreen;