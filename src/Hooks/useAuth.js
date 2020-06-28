import { useState, useEffect } from "react";
import firebase from "../../Firebase/Firebase";

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setAuthInfo(response);
    });
  }, []);
  return {
    sauthInfo,
    setAuthInfo,
  };
};
