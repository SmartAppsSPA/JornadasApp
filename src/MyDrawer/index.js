import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "./Style";
import HomeScreen from "../MyScreens/HomeScreen";
import PerfilScreen from "../MyScreens/PerfilScreen";
import BonoScreen from "../MyScreens/BonoScreen";
import DonarScreen from "../MyScreens/DonarScreen";
import { navigationRef } from "../MyScreens/RootNavigation";
import Eventos from "../MyScreens/EventosScreen";
import SplashScreen from "../MyScreens/SplashScreen";

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
      <ScrollView>
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
          iconName="calendar-alt"
          titleName="Eventos"
          navigation={() => props.navigation.navigate("Eventos")}
        />

        <DrawerMenu
          iconName="user"
          titleName="Perfil"
          navigation={() => props.navigation.navigate("Perfil")}
        />
      </ScrollView>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer({ ...props }) {
  console.log(props.user.uid);
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        initialRouteName="Splash"
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Donar" component={DonarScreen} />
        <Drawer.Screen name="Bono" component={BonoScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Eventos" component={Eventos} />
        <Drawer.Screen name="Splash" component={SplashScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;
