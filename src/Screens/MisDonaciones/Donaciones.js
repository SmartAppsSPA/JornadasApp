import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ImageBackground,
} from "react-native";
import HeaderView from "../../components/Layouts/Header";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import AlcanciaImage from "../../components/Layouts/AlcanciaImage";

export default function Donaciones(props) {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [aportesList, setAportesList] = useState([]);
	let aportesToArray = [];

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${userFbData.uid}/aportes`)
			.on("value", (snapshot) => {
				setAportesList(snapshot.val());
			});
	}, []);

	if (aportesList) {
		Object.keys(aportesList).forEach((key, i) => {
			aportesToArray[i] = aportesList[key];
		});

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<HeaderView props={props} />
				</View>
				<View style={styles.imageContainer}>
					<AlcanciaImage />
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Mis Donaciones</Text>
				</View>
				<View style={styles.detailContainer}>
					<ScrollView style={styles.scroll}>
						{aportesToArray.map((aporte, i) => {
							return (
								<View key={i} style={styles.detailBox}>
									<View style={styles.infoView}>
										<View style={styles.textBox}>
											<Text style={styles.textKey}>Nombre:</Text>
											<Text style={styles.textValue}>
												{aporte.nombre} {aporte.apellido}
											</Text>
										</View>
										<View style={styles.textBox}>
											<Text style={styles.textKey}>Aporte:</Text>
											<Text style={styles.textValue}>
												{numberFormat(aporte.aporte)}
											</Text>
										</View>
										<View style={styles.textBox}>
											<Text style={styles.textKey}>Fecha:</Text>
											<Text style={styles.textValue}>{aporte.fecha}</Text>
										</View>
										<TouchableOpacity
											onPress={() =>
												navigation.navigate("InfoDonaciones", {
													content: aporte,
													uid: userFbData.uid,
													key: i,
													subtipo: userFbData.subtipo,
												})
											}
											key={i}
											style={styles.infoButton}
										>
											<Icon
												type="FontAwesome5"
												name="arrow-circle-right"
												size={50}
												color="#34495E"
												style={styles.icon}
											/>
										</TouchableOpacity>
									</View>
								</View>
							);
						})}
					</ScrollView>
				</View>
				<View style={styles.backContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.backButton}
					>
						<Icon type="FontAwesome5" name="home" size={35} color="#34495E" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.container2}>
				<View style={styles.headerContainer2}>
					<HeaderView props={props} />
				</View>
				<View style={styles.imageContainer}>
					<AlcanciaImage />
				</View>
				<View style={styles.titleContainer2}>
					<Text style={styles.title}>Mis Donaciones</Text>
				</View>
				<View style={styles.subTitleContainer2}>
					<ImageBackground
						source={require("../../../assets/Cruz_de_malta.png")}
						style={styles.imageBackground}
						imageStyle={{ resizeMode: "contain", opacity: 0.25 }}
					>
						<Text style={styles.subTitle2}>Aún no ha realizado</Text>
						<Text style={styles.subTitle2}>donaciones.</Text>
					</ImageBackground>
				</View>
				<View style={styles.backContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.backButton}
					>
						<Icon type="FontAwesome5" name="home" size={35} color="#34495E" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 10,
	},
	headerContainer: {
		flex: 0.5,
	},
	imageContainer: {
		flex: 3,
		marginTop: 6,
		zIndex: -1,
	},
	titleContainer: {
		flex: 0.4,
	},
	detailContainer: {
		flex: 4,
		alignItems: "center",
		backgroundColor: "#A9B4C0",
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "#34495E",
	},
	backContainer: {
		flex: 1,
		marginLeft: 10,
	},
	title: {
		fontSize: 20,
		color: "#03255F",
		fontWeight: "bold",
		textAlign: "center",
	},
	scroll: {
		width: width * 0.95,
	},
	infoView: {
		paddingVertical: 2.5,
		paddingHorizontal: 2.5,
		marginVertical: 10,
		backgroundColor: "#fff",
		borderWidth: 0.05,
		borderRadius: 10,
	},
	textBox: {
		flexDirection: "row",
	},
	textKey: {
		marginLeft: 2,
		flex: 1,
		fontSize: 12.5,
		fontWeight: "bold",
		color: "#03255f",
		marginLeft: 10,
	},
	textValue: {
		flex: 3,
		fontSize: 10,
		fontWeight: "700",
		color: "#696969",
	},
	infoButton: {
		flex: 1,
		width: 55,
		height: 55,
		borderRadius: 25,
		marginLeft: 300,
		position: "absolute",
	},
	backButton: {
		flexDirection: "row",
		width: 55,
		height: 55,
		alignSelf: "flex-start",
		justifyContent: "center",
		borderRadius: 25,
		marginTop: 15,
		marginLeft: 20,
		position: "absolute",
	},
	detailBox: {
		width: width * 0.95,
		height: height * 0.1,
		marginVertical: 10,
	},
	//sin Donaciones
	container2: {
		flex: 10,
	},
	headerContainer2: {
		flex: 0.5,
	},
	imageContainer2: {
		flex: 3,
		marginTop: -5,
		zIndex: -2,
		marginBottom: -20,
	},
	titleContainer2: {
		flex: 0.5,
		marginTop: -50,
	},
	subTitleContainer2: {
		flex: 3,
		width: width,
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: "#A9B4C0",
		borderWidth: 0.05,
		borderRadius: 30,
		borderColor: "#34495E",
		borderWidth: 1,
		borderColor: "#03255f",
	},
	subTitle2: {
		fontSize: 25,
		color: "#03255f",
		fontWeight: "bold",
		width: width * 0.95,
		textAlign: "center",
		alignSelf: "center",
	},
	imageBackground: {
		alignSelf: "center",
		justifyContent: "center",
		width: width * 0.85,
		height: height * 0.35,
	},
});
