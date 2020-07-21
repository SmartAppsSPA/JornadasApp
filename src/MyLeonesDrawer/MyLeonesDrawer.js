import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import firebase from "../../Firebase/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "./Style"
//Screens
import HomeScreen from "../MyLeonesScreen/HomeScreen";
import PerfilScreen from "../MyLeonesScreen/PerfilScreen";
import MisAlcanciasScreen from "../MyLeonesScreen/MisAlcanciasScreen";

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
          titleName="Mis Alcancias"
          navigation={() => props.navigation.navigate("Alcancias")}
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
        <Drawer.Screen name="Alcancias" component={MisAlcanciasScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Cerrar Sesión" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyUserDrawer;
