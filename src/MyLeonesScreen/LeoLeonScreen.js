import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";

export default function LeoLeonScreen(props) {
    return (
        <View style={styles.mainView}>
        <HeaderView props={props} />
        <MainImage />
        <ScrollView>
          <View>
            <Text style={styles.titles}>Mi Panel</Text>
          </View>
        </ScrollView>
      </View>
    )
}
