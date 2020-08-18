import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	Modal,
	Linking,
	Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import HeaderView from "../../components/Layouts/Header";
import firebase from "../../../Firebase/Firebase";
import usePreference from "../../Hooks/usePreferences";
import CarouselHome from "../../components/Layouts/Carousel";
import { Row } from "native-base";

export default function HomeUser(props) {
	const navigation = useNavigation();
	const { userFbData, setUserFbData } = usePreference();
	const [modalVisible, setModalVisible] = useState(false);

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
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Donar", {
								userData: userFbData,
							})
						}
						style={styles.buttonYellow}
					>
						<Text style={styles.textYellow}>
							<Icon name="donate" size={20} color="#03255F" />
							{`\nAlcancía\nDigital`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Bingo")}
						style={styles.buttonBlue}
					>
						<Text style={styles.textBlue}>
							<Icon name="delicious" size={20} color="#F5C300" />
							{`\nBingo`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Bono")}
						style={styles.buttonYellow}
					>
						<Text style={styles.textYellow}>
							<Icon name="edit" size={20} color="#03255F" />
							{`\nBono\nSorteo`}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsContainer2}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Mis Donaciones")}
						style={styles.buttonBlue}
					>
						<Text style={styles.textBlue}>
							<Icon name="hand-holding-usd" size={20} color="#F5C300" />
							{`\n\Mis\nDonaciones`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						style={styles.buttonBlue}
					>
						<Image
							source={require("../../../assets/Cruz_de_malta.png")}
							style={{
								resizeMode: "stretch",
								width: width * 0.20,
								height: height * 0.11,
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Mis Bonos")}
						style={styles.buttonBlue}
					>
						<Text style={styles.textBlue}>
							<Icon name="receipt" size={20} color="#F5C300" />
							{`\nMis\nBonos`}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsContainer3}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Mis Bingos")}
						style={styles.buttonYellow}
					>
						<Text style={styles.textYellow}>
							<Icon name="table" size={20} color="#03255f" />
							{`\nMis\nBingos`}
						</Text>
					</TouchableOpacity>
					{userFbData.subtipo ? (
						<TouchableOpacity
							onPress={() => navigation.navigate("Panel De Control")}
							style={styles.buttonBlue}
						>
							<Text style={styles.textBlue}>
								<Icon name="tools" size={20} color="#F5C300" />
								{`\nPanel\nDe Control`}
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.buttonBlue}>
							<Text></Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={Logout} style={styles.buttonYellow}>
						<Text style={styles.textYellow}>
							<Icon name="door-open" size={20} color="#03255F" />
							{`\nCerrar\nSesión`}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.redesContainer}>
					{/* <Text style={styles.titleRedes}>Nuestras Redes Sociales</Text> */}
					<Icon name="facebook" size={35} color="#3b5998" style={styles.socialIcon} onPress={() => Linking.openURL("https://www.facebook.com/lasjornadas/")}/>
					<Icon name="instagram" size={35} color="#c13584" style={styles.socialIcon} onPress={() => Linking.openURL("https://www.instagram.com/jornadasporlarehabilitacion/?hl=es")} />
					<Icon name="twitter" size={35} color="#00acee" style={styles.socialIcon} onPress={() => Linking.openURL("https://twitter.com/lasjornadas?lang=es")} />
					<Icon name="youtube" size={35} color="#c4302b" style={styles.socialIcon} onPress={() => Linking.openURL("https://www.youtube.com/user/lasjornadas")} />
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={styles.modalContent}>
								<Text style={styles.modalText}>Jornadas Magallanicas App.</Text>
								<Text style={styles.modalText}>
									© Copyrights 2020 Leones Cruz del Sur all rights reserved.
								</Text>
								<Text style={styles.modalText}>
									Hecho con 🧡 por{" "}
									<Text
										onPress={() => Linking.openURL("http://smartapps.cl")}
										style={styles.smartApps}
									>
										SmartApps Spa.
									</Text>
								</Text>
								<TouchableOpacity
									style={styles.openButton}
									onPress={() => {
										setModalVisible(!modalVisible);
									}}
								>
									<Text style={styles.textStyle}>Cerrar</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		);
	} else {
		return null;
	}
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 10,
		width: width,
		// height: height,
	},
	headerContainer: {
		flex: 1,
	},
	carouselContainer: {
		flex: 5,
		zIndex: -2,
		marginBottom: 10,
	},
	redesContainer:{
		flexDirection: 'row',
		justifyContent: 'center',
	},
	socialIcon:{
		marginHorizontal: 10,
		marginBottom: 10,
	},
	buttonsContainer1: {
		// flex: 2.1,
		width: width,
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#A9D0F5",
		borderTopWidth: 0.75,
		borderLeftWidth: 0.75,
		borderRightWidth: 0.75,
		borderColor: "#34495E",
		borderTopStartRadius: 30,
		borderTopEndRadius: 30,
	},
	buttonsContainer2: {
		// flex: 2.1,
		width: width,
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#F5F6CE",
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: "#34495E",
	},
	buttonsContainer3: {
		// flex: 2.1,
		width: width,
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#A9D0F5",
		borderBottomWidth: 0.75,
		borderLeftWidth: 0.75,
		borderRightWidth: 0.75,
		borderColor: "#34495E",
		borderBottomStartRadius: 30,
		borderBottomEndRadius: 30,
		marginBottom: 20,
	},
	buttonBlue: {
		width: width * 0.25,
		height: height * 0.135,
		borderRadius: 10,
		backgroundColor: "#03255F",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 12,
		marginHorizontal:6,
		shadowRadius: 1,
		shadowOpacity: 2,
		shadowOffset: { width: -5, height: -3 },
		shadowColor: "#696969",
		elevation: 6,
	},
	buttonYellow: {
		width: width * 0.25,
		height: height * 0.135,
		borderRadius: 10,
		backgroundColor: "#F5C300",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 12,
		marginHorizontal:6,
		shadowRadius: 2,
		shadowOpacity: 2,
		shadowOffset: { width: -5, height: -3 },
		shadowColor: "#616161",
		elevation: 6,
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

	//modal
	centeredView: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		width: "80%",
		height: "40%",
		backgroundColor: "#03255f",
		borderRadius: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderColor: "#a9d0f5",
		borderWidth: 2,
	},
	modalContent: {
		marginVertical: 25,
		marginHorizontal: 10,
	},
	openButton: {
		width: 100,
		height: 30,
		backgroundColor: "#f5c300",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 2,
		alignSelf: "center",
	},
	textStyle: {
		marginTop: 6,
		color: "#03255f",
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		fontSize: 15,
	},
	modalText: {
		flex: 1,
		textAlign: "center",
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 20,
	},
	smartApps: {
		color: "#F5F6CE",
		fontSize: 20,
	},
});
