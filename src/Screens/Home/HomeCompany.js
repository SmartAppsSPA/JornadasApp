import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import HeaderView from "../../components/Layouts/Header";
import firebase from "../../../Firebase/Firebase";
import usePreference from "../../Hooks/usePreferences";
import CarouselHome from "../../components/Layouts/Carousel";

export default function HomeCompany(props) {
	const navigation = useNavigation();
	const { userFbData, setUserFbData } = usePreference();

	const Logout = () => {
		firebase.auth().signOut();
		setUserFbData(null);
	};

	if (userFbData) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<HeaderView props={props} />
				</View>
				<View style={styles.carouselContainer}>
					<CarouselHome />
				</View>
				<View style={styles.buttonsContainer1}>
					<TouchableOpacity style={styles.buttonYellow}>
						<Text style={styles.textYellow}></Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Donar")}
						style={styles.buttonBlue}
					>
						<Text style={styles.textBlue}>
							<Icon name="donate" size={20} color="#F5C300" />
							{`\nAlcancia Digital`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonYellow}>
						<Text style={styles.textYellow}></Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsContainer2}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Mis Donaciones")}
						style={styles.buttonBlue}
					>
						<Text style={styles.textBlue}>
							<Icon name="hand-holding-usd" size={20} color="#F5C300" />
							{`\nMis Donaciones`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							width: 110,
							height: 110,
							alignItems: "center",
							justifyContent: "center",
							marginLeft: 5,
							marginRight: 5,
						}}
					>
						<Image
							source={require("../../../assets/Cruz_de_malta.png")}
							style={{
								resizeMode: "stretch",
								height: 100,
								width: 100,
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Perfil")}
						style={styles.buttonBlue}
					>
						<Text style={styles.textBlue}>
							<Icon name="users" size={20} color="#F5C300" />
							{`\nPerfil`}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsContainer3}>
					<TouchableOpacity style={styles.buttonYellow}>
						<Text style={styles.textYellow}></Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={Logout} style={styles.buttonBlue}>
						<Text style={styles.textBlue}>
							<Icon name="door-open" size={20} color="#f5c300" />
							{`\nCerrar Sesión`}
						</Text>
					</TouchableOpacity>
					{userFbData.subtipo ? (
						<TouchableOpacity
						onPress={() => navigation.navigate("Panel De Control")}
						style={styles.buttonYellow}
					>
						<Text style={styles.textYellow}>
							<Icon name="tools" size={20} color="#03255F" />
							{`\nPanel De Control`}
						</Text>
					</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.buttonYellow}>
							<Text></Text>
						</TouchableOpacity>
					)}
				</View>
			</SafeAreaView>
		);
	} else {
		return null;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 10,
	},
	headerContainer: {
		flex: 1,
	},
	carouselContainer: {
		flex: 3,
		marginBottom: 20,
	},
	buttonsContainer1: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: '#A9D0F5',
		marginHorizontal: 28,
	},
	buttonsContainer2: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: '#F5F6CE',
		marginHorizontal: 28,
	},
	buttonsContainer3: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: '#A9D0F5',
		marginHorizontal: 28,
	},
	buttonBlue: {
		width: 110,
		height: 110,
		backgroundColor: "#03255F",
		alignItems: "center",
		justifyContent: "center",
		margin: 4,
	},
	buttonYellow: {
		width: 110,
		height: 110,
		backgroundColor: "#F5C300",
		alignItems: "center",
		justifyContent: "center",
		margin: 4,
	},
	textBlue: {
		fontSize: 13,
		color: "#F5C300",
		fontWeight: "bold",
		justifyContent: "center",
		textAlign: "center",
	},
	textYellow: {
		fontSize: 13,
		color: "#03255F",
		fontWeight: "bold",
		justifyContent: "center",
		textAlign: "center",
	},
});

