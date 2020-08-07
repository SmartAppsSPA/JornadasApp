import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	ImageBackground,
} from "react-native";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

export default function MisBonos(props) {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [bonos, setBonos] = useState([]);
	let bonosToArray = [];

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${userFbData.uid}/bonos`)
			.on("value", (snapshot) => {
				setBonos(snapshot.val());
			});
	}, []);

	if (bonos) {
		Object.keys(bonos).forEach((key, i) => {
			bonosToArray[i] = bonos[key];
		});

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<HeaderView props={props} />
				</View>
				<View style={styles.imageContainer}>
					<MainImage />
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Mis Bonos</Text>
				</View>
				<View style={styles.detailContainer}>
					<ScrollView>
						{bonosToArray.map((Bonos, i) => {
							return (
								<View key={i} style={styles.detailBox}>
									<View style={{ alignItems: "center" }}>
										<View style={{ flexDirection: "row" }}>
											<Text
												style={{
													fontWeight: "bold",
													color: "#03255F",
													fontSize: 15,
												}}
											>
												Cantidad:{"  "}
											</Text>
											<Text style={{ color: "#03255F" }}>{Bonos.cantidad}</Text>
										</View>
										<Text style={{ fontWeight: "bold", color: "#696969" }}>
											{Bonos.total}CLP {"  "} {Bonos.fecha}
										</Text>
										<View style={{ flexDirection: "row" }}>
											<Text
												style={{
													fontWeight: "bold",
													color: "#696969",
													fontSize: 15,
												}}
											>
												id:{"  "}
											</Text>
											<Text style={{ fontWeight: "500", color: "#696969" }}>
												{Bonos.id}
											</Text>
										</View>
									</View>
								</View>
							);
						})}
					</ScrollView>
				</View>
				<View style={styles.backContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.comeBack}
					>
						<Icon
							raised
							name="arrow-left"
							type="font-awesome"
							color="#03255F"
						/>
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
				<View style={styles.imageContainer2}>
					<MainImage />
				</View>
				<View style={styles.titleContainer2}>
					<Text style={styles.title}>Mis Bonos</Text>
				</View>
				<View style={styles.subTitleContainer2}>
					<ImageBackground
						source={require("../../../assets/Cruz_de_malta.png")}
						style={styles.imageBackground}
					>
						<Text style={styles.subTitle2}>No hay datos para mostrar.</Text>
					</ImageBackground>
				</View>
				<View style={styles.backContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.comeBack}
					>
						<Icon
							raised
							name="arrow-left"
							type="font-awesome"
							color="#03255F"
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 9,
	},
	headerContainer: {
		flex: 0.5,
	},
	imageContainer: {
		flex: 4,
		marginTop: 20,
	},
	titleContainer: {
		flex: 0.5,
	},
	detailContainer: {
		flex: 4,
		alignItems: "center",
		backgroundColor: "#A9D0F5",
	},
	backContainer: {
		marginLeft: 10,
	},

	title: {
		fontSize: 20,
		color: "#03255F",
		fontWeight: "bold",
		textAlign: "center",
	},
	detailBox: {
		width: width * 0.95,
		height: height * 0.1,
		margin: 5,
		backgroundColor: "#fff",
	},
	//sin bonos
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
		backgroundColor: "#F5F6CE",
		justifyContent: "center",
	},
	subTitle2: {
		fontSize: 25,
		color: "#03255F",
		fontWeight: "bold",
		width: width * 0.95,
		textAlign: "center",
		alignSelf: "center",
	},
	imageBackground: {
		resizeMode: "cover",
		alignSelf: "center",
		justifyContent: "center",
		width: 200,
		height: 200,
		marginTop: 20,
		opacity: 0.4,
	},
});
