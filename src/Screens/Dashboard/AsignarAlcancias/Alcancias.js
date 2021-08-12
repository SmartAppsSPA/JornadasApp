import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import usePreference from "../../../Hooks/usePreferences";
import firebase from "../../../../Firebase/Firebase";
import Header from "../../../components/Layouts/Header";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Alcancias() {
  const navigation = useNavigation();
  const { userFbData } = usePreference();
  const [alcancias, setAlcancias] = useState([]);
  let alcanciasToArray = [];

  useEffect(() => {
    const fbData = firebase
      .database()
      .ref(`Users/${userFbData.uid}/alcancias/`)
      .on("value", (snapshot) => {
        console.log(snapshot.val())
        setAlcancias(snapshot.val());
      });

    return () => fbData;
  }, []);

  if (alcancias && userFbData) {
    Object.keys(alcancias).forEach((key, i) => {
      alcanciasToArray[i] = alcancias[key];
    });
    return (
      <>
        <View style={styles.box1}>
          <Header />
        </View>
        <View style={styles.box2}>
          <Text style={styles.infoTitle}>Asignar alcancías</Text>
        </View>
        <View style={styles.box3}>
          <View style={styles.infoView}>
            <View style={(styles.textBox, { height: 35 })}>
              <Text style={styles.textKeyV}>Asignar varias alcancías</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AsignarVarias", {})}
              style={styles.backButton}
            >
              <Icon
                type="FontAwesome5"
                name="arrow-circle-right"
                size={50}
                color="#34495E"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {alcanciasToArray.map((alcancia, i) => {
              return !alcancia.asignada_tercero ? (
                <View key={i} style={styles.infoView}>
                  <View style={styles.textBox}>
                    <Text style={styles.textKey}>Numero De Alcancia:</Text>
                    <Text style={styles.textValue}>
                      {alcancia.alcancia_numero}
                    </Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.textKey}>Codigo de barra</Text>
                    <Text style={styles.textValue}>
                      {alcancia.codigo_barra}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Asignar", {
                        content: alcancia,
                        uid: userFbData.uid,
                        key: i,
                      })
                    }
                    key={i}
                    style={styles.backButton}
                  >
                    <Icon
                      type="FontAwesome5"
                      name="plus-circle"
                      size={50}
                      color="green"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              ) : null;
            })}
          </ScrollView>
        </View>
      </>
    );
  } else {
    return (
      <SafeAreaView style={styles.mainView}>
        <Header />
        <Text style={styles.infoTitle}>Asignar alcancías</Text>
        <ScrollView>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text
              style={{ fontWeight: "bold", color: "#03255F", fontSize: 15 }}
            >
              No tiene alcancías asignadas.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  box1: {
    flex: 0.5,
  },
  box2: {
    flex: 0.5,
  },
  box3: {
    flex: 4,
  },
  infoTitle: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#34495E",
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  infoView: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 26,
    backgroundColor: "#fff",
    borderWidth: 0.05,
    borderRadius: 5,
  },
  textBox: { flexDirection: "row" },
  textKey: {
    flex: 1,
    marginLeft: 3,
    fontSize: 15,
    fontWeight: "bold",
    color: "#03255f",
  },
  textKeyV: {
    flex: 1,
    marginLeft: 20,
    paddingTop: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#03255f",
  },
  textValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#696969",
    marginRight: 70,
  },
  backButton: {
    flexDirection: "row",
    width: 55,
    height: 55,
    alignSelf: "flex-end",
    justifyContent: "center",
    borderRadius: 25,
    marginLeft: 20,
    position: "absolute",
  },
  icon: {
    marginTop: 3,
  },
});
