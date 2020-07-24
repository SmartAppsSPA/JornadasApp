import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import firebase from "../../Firebase/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "./Style"
//Screens
import HomeScreen from "../MyLeonesScreen/HomeScreen";
import DonarScreen from '../MyLeonesScreen/DonarScreen';
import BingosScreen from '../MyLeonesScreen/BingosScreen';
import BonoScreen from '../MyLeonesScreen/BonoScreen';
import MisDonacionesScreen from '../MyLeonesScreen/MisDonacionesScreen';
import MisBonosScreen from '../MyLeonesScreen/MisBonosScreen';
import PerfilScreen from "../MyLeonesScreen/PerfilScreen";

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
          iconName="edit"
          titleName="Comprar Bono"
          navigation={() => props.navigation.navigate("Bono")}
        />
        <DrawerMenu
          iconName="delicious"
          titleName="Bingo"
          navigation={() => props.navigation.navigate("Bingo")}
        />
        <DrawerMenu
          iconName="receipt"
          titleName="Mis Bonos"
          navigation={() => props.navigation.navigate("Mis Bonos")}
        />
        <DrawerMenu
          iconName="hand-holding-usd"
          titleName="Mis Donaciones"
          navigation={() => props.navigation.navigate("Mis Donaciones")}
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
        <Drawer.Screen name="Donar" component={DonarScreen}/>
        <Drawer.Screen name="Bingo" component={BingosScreen}/>
        <Drawer.Screen name="Bono" component={BonoScreen}/>
        <Drawer.Screen name="Mis Donaciones" component={MisDonacionesScreen} />
        <Drawer.Screen name="Mis Bonos" component={MisBonosScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Cerrar Sesión" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyUserDrawer;