import "react-native-gesture-handler";
import React, { useState, useEffect, useMemo} from "react";
import firebase from "./Firebase/Firebase";
import MyUserDrawer from "./src/MyUserDrawer/MyUserDrawer";
import MyCompanyDrawer from "./src/MyCompanyDrawer/MyCompanyDrawer";
import MyStack from "./src/MyStack/MyStack";
import PreferencesContext from './src/Context/PreferencesContext';
const App = () => {
  const [user, setUser] = useState(undefined);
  const [userFbData, setUserFbData] = useState(null);

  useEffect(() => {
     firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
      if (response) {
        firebase
          .database()
          .ref(`Users/${response.uid}`)
          .on("value", (snapshot) => {
            setUserFbData(snapshot.val());
          });
      } else {
        console.log("No hay usuario logeado");
      }
    });
  }, [user]);


  const preferences = useMemo(
    ()=>({
      setUserFbData,
      userFbData
    }),
    [userFbData]
  )

//console.log(preferences)

  if (user === undefined) return null;

  if (user && userFbData) {
    if (userFbData.tipo === "User") {
      return (
       <PreferencesContext.Provider value={preferences}>
       <MyUserDrawer />
       </PreferencesContext.Provider>
       );
    } else if (userFbData.tipo === "Company") {
      return (
      <PreferencesContext.Provider value={preferences}>
      <MyCompanyDrawer />
      </PreferencesContext.Provider>
      );
    } else {
      return <MyStack />;
    }
  } else {
    return <MyStack />;
  }
};

export default App;
