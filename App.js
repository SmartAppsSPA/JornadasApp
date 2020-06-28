import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import firebase from "./Firebase/Firebase";
import MyDrawer from "./src/MyDrawer";
import MyStack from "./src/MyStack";

const App = () => {
  const [user, setUser] = useState(undefined);

  const AuthConfirmation = () => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response.json());
    });
  };

  useEffect(() => {
    AuthConfirmation();
  }, []);

  if (user) {
    return <MyDrawer user={user} />;
  } else {
    return <MyStack />;
  }
};

export default App;
