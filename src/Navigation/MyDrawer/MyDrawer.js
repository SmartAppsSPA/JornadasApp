import React from "react";
import usePreference from "../../Hooks/usePreferences";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
//Screens
import HomeScreen from '../../Screens/Home/HomeScreen';
import PerfilScreen from "../../Screens/Perfil/PerfilScreen";
import firebase from "../../../Firebase/Firebase";
import Dashboard from "../../Screens/Dashboard/Dashboard";


function DrawerMenu(props) {
	return (
		<TouchableOpacity onPress={props.navigation} {...props}>
			<View style={styles.menuContainer}>
				<View style={styles.iconoContainer}>
					<Icon size={22.5} name={props.iconName} style={{ color: "#03255F" }} />
				</View>
				<View style={styles.tituloContainer}>
					<Text style={styles.tituloTxt}>{props.titleName}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

function Menu(props) {
	const { userFbData, setUserFbData } = usePreference();

	const Logout = () => {
		firebase.auth().signOut();
		setUserFbData(null);	
	};

	if (userFbData) {
		return (
			<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.bgContainer}>
					<View style={styles.userContainer}>
						<Image
							source={require("../../../assets/logo_jornadas_leones.png")}
							style={styles.userImagen}
						/>
					</View>
					
				</View>
				<ScrollView>
					<DrawerMenu
						iconName="home"
						titleName="Inicio"
						navigation={() => props.navigation.navigate("Home")}
					/>
					{userFbData.tipo === "User" ? (
						<DrawerMenu
							iconName="receipt"
							titleName="Mis Bonos"
							navigation={() => Linking.openURL("https://www.appjornadasmagallanicas.cl/DescargaBonos")}
							
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
			</SafeAreaView>
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
			<Drawer.Navigator drawerContent={(props) => <Menu {...props}  />} drawerStyle={styles.drawer}>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Panel De Control" component={Dashboard} />
				<Drawer.Screen name="Perfil" component={PerfilScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default MyDrawer;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	drawer:{
		width: width*0.55,
	},
	container: {
		backgroundColor: "white",
		width: width*0.55,
	  },
	
	  bgContainer: {
		borderBottomWidth: 0.5,
		backgroundColor: "#03255F",
	  },
	
	  userContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		backgroundColor: "#03255F",
		marginBottom: 20,
		width: 200,
	  },
	
	  userImagen: {
		width: 200,
		height: 70,
	  },
	
	  userNombre: {
		marginVertical: 10,
	  },
	
	  userTitulo: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	  },
	
	  userSubTitulo: {
		textAlign: "center",
		fontSize: 11,
		color: "#a537fd",
		paddingVertical: 5,
	  },
	  menuContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginLeft: 10,
		marginVertical: 12,
		width: 200,
	  },
	
	  iconoContainer: {
		flex: 1.5,
		justifyContent: "center",
		marginLeft: 2,
	  },
	
	  tituloContainer: {
		flex: 8.5,
		justifyContent: "center",
		marginLeft: 12.5,
	  },
	
	  tituloTxt: {
		fontSize: 10,
		color: "#03255F",
		fontWeight: "bold",
	  },
	  difuminado: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	  },
	  fondoImagen: {
		position: "absolute",
	  },
});
