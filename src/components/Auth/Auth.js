import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "./Style";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../../assets/logo_jornadas.png")}
      />
      {isLogin ? (
        <View>
          <LoginForm changeForm={changeForm} />
        </View>
      ) : (
        <View>
          <RegisterForm changeForm={changeForm} />
        </View>
      )}
    </View>
  );
};

export default Auth;
