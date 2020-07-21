import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import firebase from "../../Firebase/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "./Style";
//Screens
import HomeScreen from "../MyCompanyScreen/HomeScreen";
import PerfilScreen from "../MyCompanyScreen/PerfilScreen";
import DonarScreen from "../MyCompanyScreen/DonarScreen";

const Logout = () => {
  firebase.auth().signOut();
};

function DrawerMenu(props) {
  return (
    <TouchableOpacity onPress={props.navigation} {...props}>
      <View style={styled.menuContainer}>
        <View style={styled.iconoContainer}>
          <Icon size={25} name={props.iconName} style={{ color: "#03255F" }} />
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
      <ScrollView>
        <DrawerMenu
          iconName="home"
          titleName="Inicio"
          navigation={() => props.navigation.navigate("Home")}
        />
        <DrawerMenu
          iconName="donate"
          titleName="Alcancia Digital"
          navigation={() => props.navigation.navigate("Donar")}
        />
        <DrawerMenu
          iconName="users"
          titleName="Perfil"
          navigation={() => props.navigation.navigate("Perfil")}
        />
        <DrawerMenu
          iconName="door-open"
          titleName="Cerrar Sesión"
          onPress={() => Logout()}
        />
      </ScrollView>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyUserDrawer(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Donar" component={DonarScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Cerrar Sesión" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyUserDrawer;
