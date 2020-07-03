import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import firebase from "./Firebase/Firebase";
import MyUserDrawer from "./src/MyUserDrawer/MyUserDrawer";
import MyCompanyDrawer from "./src/MyCompanyDrawer/MyCompanyDrawer";
import MyStack from "./src/MyStack/MyStack";

const App = () => {
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
      if (response) {
        firebase
          .database()
          .ref(`Users/${response.uid}`)
          .on("value", (snapshot) => {
            setUserData(snapshot.val());
          });
      } else {
        console.log("No hay usuario logeado");
      }
    });
  }, [user]);

  if (user === undefined) return null;

  if (user && userData) {
    if (userData.tipo === "User") {
      return <MyUserDrawer user={user} userData={userData} />;
    } else if (userData.tipo === "Company") {
      return <MyCompanyDrawer user={user} userData={userData} />;
    } else {
      return <MyStack />;
    }
  } else {
    return <MyStack />;
  }
};

export default App;
