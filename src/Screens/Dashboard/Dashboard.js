import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
//Tabs
import MisAlcancias from "./MisAlcancias/MisAlcancias";
import MisTalonarios from "./MisTalonarios/MisTalonarios";
import AsignarAlcancias from "./AsignarAlcancias/AsignarAlcancias";
import AsignarTalonarios from "./AsignarTalonarios/AsignarTalonarios";
// import Home from "./Home/Home";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				inactiveTintColor: "#696969",
				activeTintColor: "#03255F",
			}}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => screenOptions(route, color),
			})}
		>
			{/* <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} /> */}
			<Tab.Screen
				name="MisAlcancias"
				component={MisAlcancias}
				options={{ title: "Mis Alcancias" }}
			/>
			<Tab.Screen
				name="MisTalonarios"
				component={MisTalonarios}
				options={{ title: "Mis Talonarios" }}
			/>
			<Tab.Screen
				name="AsignarAlcancias"
				component={AsignarAlcancias}
				options={{ title: "Asignar Alcancias" }}
			/>
			<Tab.Screen
				name="AsignarTalonarios"
				component={AsignarTalonarios}
				options={{ title: "Asignar Talonarios" }}
			/>
		</Tab.Navigator>
	);
}

function screenOptions(route, color) {
	let iconName;

	switch (route.name) {
        // case "Home":
		// 	iconName = "home";
		// 	break;
		case "MisAlcancias":
			iconName = "donate";
			break;
		case "MisTalonarios":
			iconName = "edit";
			break;
		case "AsignarAlcancias":
			iconName = "hand-holding-usd";
			break;
		case "AsignarTalonarios":
			iconName = "receipt";
			break;
		default:
			break;
	}
	return <Icon type="FontAwesome5" name={iconName} size={22} color={color} />;
}
