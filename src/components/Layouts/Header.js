import React from "react";
import { Image } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import styles from "../../Utils/Style";
import {useNavigation} from  '@react-navigation/native'

const HeaderView = () => {
  const navigation = useNavigation();
  return (
    <Header style={styles.header}>
      <Left>
        <Icon
          style={styles.icon}
          name="menu"
          onPress={() => navigation.openDrawer()}
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
