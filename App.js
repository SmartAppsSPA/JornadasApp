import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
} from "react-native";
import Auth from "./src/components/Auth/Auth";
import firebase from "./Firebase/Firebase";
import MyDrawer from "./src/MyDrawer";
import MyStack from "./src/components/Auth/MyStack";
export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;
  console.log(user);
  return (
    <>
      {user ? (
        <MyDrawer />
      ) : (
        // <MyStack />
        <>
          <StatusBar />
          <SafeAreaView style={styles.background}>
            <ScrollView>
              <Auth />
            </ScrollView>
            <Text style={styles.smartApps}>©2020 Powered by Smartapps</Text>
          </SafeAreaView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#03255F",
    height: "100%",
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#F5C300",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  smartApps: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    marginBottom: 50,
  },
});
