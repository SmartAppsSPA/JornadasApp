import * as React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "./Style";
import HomeScreen from "../MyScreens/HomeScreen";
import PerfilScreen from "../MyScreens/PerfilScreen";
import BonoScreen from "../MyScreens/BonoScreen";
import DonarScreen from "../MyScreens/DonarScreen";
import { navigationRef } from "../MyScreens/RootNavigation";

function DrawerMenu(props) {
  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={styled.menuContainer}>
        <View style={styled.iconoContainer}>
          <Icon size={35} name={props.iconName} style={{ color: "#03255F" }} />
        </View>
        <View style={styled.tituloContainer}>
          <Text style={styled.tituloTxt}>{props.titleName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Menu(props) {
  return (
    <View style={styled.container}>
      <View style={styled.bgContainer}>
        <View style={styled.userContainer}>
          <Image
            source={require("../../assets/logo_jornadas_leones.png")}
            style={styled.userImagen}
          />
        </View>
      </View>
      <DrawerMenu
        iconName="home"
        titleName="Home"
        navigation={() => props.navigation.navigate("Home")}
      />
      <DrawerMenu
        iconName="donate"
        titleName="Alcancia Digital"
        navigation={() => props.navigation.navigate("Donar")}
      />
      <DrawerMenu
        iconName="list-ol"
        titleName="Comprar Bono"
        navigation={() => props.navigation.navigate("Bono")}
      />
      <DrawerMenu
        iconName="user"
        titleName="Perfil"
        navigation={() => props.navigation.navigate("Perfil")}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Donar" component={DonarScreen} />
        <Drawer.Screen name="Bono" component={BonoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;
