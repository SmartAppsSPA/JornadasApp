import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
//Tabs
import MisAlcancias from "./MisAlcancias/MisAlcancias";
import MisTalonarios from "./MisTalonarios/MisTalonarios";
import AsignarAlcancias from "./AsignarAlcancias/AsignarAlcancias";
import AsignarTalonarios from "./AsignarTalonarios/AsignarTalonarios";
import usePreference from "../../Hooks/usePreferences";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
	const { userFbData } = usePreference();
	if (userFbData) {
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
				<Tab.Screen
					name="MisAlcancias"
					component={MisAlcancias}
					options={{ title: "Mis Alcancías" }}
				/>
				<Tab.Screen
					name="MisTalonarios"
					component={MisTalonarios}
					options={{ title: "Mis Talonarios" }}
				/>
				{userFbData.subtipo === "Leo/Leon"  || userFbData.subtipo === "Admin" ? (
					<Tab.Screen
						name="AsignarAlcancias"
						component={AsignarAlcancias}
						options={{ title: "Asignar Alcancías" }}
					/>
				) : null}
				{userFbData.subtipo === "Leo/Leon" || userFbData.subtipo === "Admin" ? (
					<Tab.Screen
						name="AsignarTalonarios"
						component={AsignarTalonarios}
						options={{ title: "Asignar Talonarios" }}
					/>
				) : null}
			</Tab.Navigator>
		);
	} else {
		return null;
	}
}

function screenOptions(route, color) {
	let iconName;

	switch (route.name) {
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
