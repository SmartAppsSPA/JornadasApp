import React from "react";
import { Image } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import styles from "./Style";

const HeaderView = ({ props }) => {
  return (
    <Header style={styles.header}>
      <Left>
        <Icon
          style={styles.icon}
          name="menu"
          onPress={() => props.navigation.openDrawer()}
        />
      </Left>
      <Right>
        <Image
          source={require("../../../assets/logo_jornadas_leones.png")}
          style={styles.headerImage}
        />
      </Right>
    </Header>
  );
};

export default HeaderView;
