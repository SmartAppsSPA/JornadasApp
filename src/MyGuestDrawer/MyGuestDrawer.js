import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import firebase from "../../Firebase/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Entypo } from "@expo/vector-icons";
import { navigationRef } from "../MyGuestScreens/RootNavigation";
import styled from "./Style";
//Screens
import HomeScreen from "../MyGuestScreen/HomeScreen";
import BonoScreen from "../MyGuestScreen/BonoScreen";
import DonarScreen from "../MyGuestScreen/DonarScreen";
import Eventos from "../MyGuestScreen/EventosScreen";

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
          titleName="Home"
          navigation={() => props.navigation.navigate("Home", { props: props })}
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
      </ScrollView>
      <TouchableOpacity onPress={Logout}>
        <View style={styled.menuContainer}>
          <View style={styled.iconoContainer}>
            <Entypo size={25} name="log-out" style={{ color: "#03255F" }} />
          </View>
          <View style={styled.tituloContainer}>
            <Text style={styled.tituloTxt}>LogOut</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyUserDrawer(props) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />} initialRouteName={'Home'} initialParams={props}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={props}
        />
        <Drawer.Screen name="Donar" component={DonarScreen} />
        <Drawer.Screen name="Bono" component={BonoScreen} />
        <Drawer.Screen name="Eventos" component={Eventos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyUserDrawer;
