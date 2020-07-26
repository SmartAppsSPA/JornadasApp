import React from "react";
import usePreference from "../../Hooks/usePreferences";
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
//Screens
import HomeScreen from "../../Screens/Home/HomeScreen";
import DonarScreen from "../../Screens/Donar/DonarScreen";
import BingosScreen from "../../Screens/Bingo/BingosScreen";
import BonoScreen from "../../Screens/Bono/BonoScreen";
import MisBonosScreen from "../../Screens/MisBonos/MisBonosScreen";
import MisDonacionesScreen from "../../Screens/MisDonaciones/MisDonacionesScreen";
import PerfilScreen from "../../Screens/Perfil/PerfilScreen";
import firebase from "../../../Firebase/Firebase";
import Dashboard from "../../components/Dashboard/Dashboard";
import MisBingos from "../../Screens/MisBingos/MisBingos";

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
	const { userFbData } = usePreference();
	if (userFbData) {
		return (
			<View style={styled.container}>
				<View style={styled.bgContainer}>
					<View style={styled.userContainer}>
						<Image
							source={require("../../../assets/logo_jornadas_leones.png")}
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
						iconName="hand-holding-usd"
						titleName="Mis Donaciones"
						navigation={() => props.navigation.navigate("Mis Donaciones")}
					/>
					{userFbData.tipo === "User" ? (
						<DrawerMenu
							iconName="edit"
							titleName="Comprar Bono"
							navigation={() => props.navigation.navigate("Bono")}
						/>
					) : null}
					{userFbData.tipo === "User" ? (
						<DrawerMenu
							iconName="receipt"
							titleName="Mis Bonos"
							navigation={() => props.navigation.navigate("Mis Bonos")}
						/>
					) : null}
					{userFbData.tipo === "User" ? (
						<DrawerMenu
							iconName="delicious"
							titleName="Bingo"
							navigation={() => props.navigation.navigate("Bingo")}
						/>
					) : null}
					{userFbData.tipo === "User" ? (
						<DrawerMenu
							iconName="table"
							titleName="Mis Bingos"
							navigation={() => props.navigation.navigate("Mis Bingos")}
						/>
					) : null}

					{userFbData.subtipo ? (
						<DrawerMenu
							iconName="tools"
							titleName="Panel de control"
							navigation={() => props.navigation.navigate("Panel De Control")}
						/>
					) : null}
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
	} else {
		return null;
	}
}

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
	return (
		<NavigationContainer>
			<StatusBar />
			<Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Donar" component={DonarScreen} />
				<Drawer.Screen name="Bono" component={BonoScreen} />
				<Drawer.Screen name="Bingo" component={BingosScreen} />
				<Drawer.Screen name="Mis Donaciones" component={MisDonacionesScreen} />
				<Drawer.Screen name="Mis Bonos" component={MisBonosScreen} />
				<Drawer.Screen name="Mis Bingos" component={MisBingos} />
				<Drawer.Screen name="Panel De Control" component={Dashboard} />
				<Drawer.Screen name="Perfil" component={PerfilScreen} />
				<Drawer.Screen name="Cerrar Sesión" component={Logout} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default MyDrawer;
