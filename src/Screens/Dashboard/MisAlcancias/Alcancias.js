import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import usePreference from "../../../Hooks/usePreferences";
import firebase from "../../../../Firebase/Firebase";
import Header from "../../../components/Layouts/Header";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Alcancias() {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [alcancias, setAlcancias] = useState([]);
	let alcanciasToArray = [];

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${userFbData.uid}/alcancias`)
			.on("value", (snapshot) => {
				setAlcancias(snapshot.val());
			});
	}, []);

	if (alcancias && userFbData) {
		Object.keys(alcancias).forEach((key, i) => {
			alcanciasToArray[i] = alcancias[key];
		});

		return (
			<SafeAreaView style={styles.mainView}>
				<Header />
				<Text style={styles.infoTitle}>Mis Alcancías</Text>
				<ScrollView>
					{alcanciasToArray.map((alcancia, i) => {
						return (
							<View key={i} style={styles.infoView}>
								<View style={styles.textBox}>
									<Text style={styles.textKey}>Numero De Alcancía:</Text>
									<Text style={styles.textValue}>
										{alcancia.alcancia_numero}
									</Text>
								</View>
								<View style={styles.textBox}>
									<Text style={styles.textKey}>Codigo de barra:</Text>
									<Text style={styles.textValue}>{alcancia.codigo_barra}</Text>
								</View>
								{alcancia.asignada_tercero === true ||
								alcancia.asignada_externo === true ? (
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Recuperada: </Text>
										{alcancia.recuperada === true ? (
											<Text style={[styles.textValue, { color: "green" }]}>
												Si
											</Text>
										) : (
											<Text style={[styles.textValue, { color: "red" }]}>
												No
											</Text>
										)}
									</View>
								) : (
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Asignada: </Text>
										<Text style={[styles.textValue, { color: "red" }]}>No</Text>
									</View>
								)}
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("InformacionAlcancia", {
											content: alcancia,
											uid: userFbData.uid,
											key: i,
											subtipo: userFbData.subtipo,
										})
									}
									key={i}
									style={styles.backButton}
								>
									{alcancia.asignada_tercero === true ||
									alcancia.asignada_externo === true ? (
										<Icon
											type="FontAwesome5"
											name={
												alcancia.recuperada === true
													? "check-circle"
													: "search"
											}
											size={50}
											color={
												alcancia.recuperada === true
													? "green"
													: "#34495E"
											}
										/>
									) : (
										<Icon
											type="FontAwesome5"
											name="question-circle"
											size={50}
											color="red"
										/>
									)}
								</TouchableOpacity>
							</View>
						);
					})}
				</ScrollView>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.mainView}>
				<Header />
				<Text style={styles.infoTitle}>Mis Alcancías</Text>
				<ScrollView>
					<View style={{ alignItems: "center", marginTop: 30 }}>
						<Text
							style={{ fontWeight: "bold", color: "#03255F", fontSize: 15 }}
						>
							No tiene alcancías asignadas.
						</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	infoTitle: {
		marginVertical: 10,
		marginHorizontal: 10,
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		justifyContent: "center",
		backgroundColor: "#34495E",
		height: 30,
		borderRadius: 15,
		overflow: "hidden",
	},
	infoView: {
		paddingVertical: 10,
		marginVertical: 10,
		marginHorizontal: 26,
		backgroundColor: "#fff",
		borderWidth: 0.05,
		borderRadius: 5,
	},
	textBox: { flexDirection: "row" },
	textKey: {
		flex: 1,
		marginLeft: 3,
		fontSize: 15,
		fontWeight: "bold",
		color: "#03255f",
	},
	textValue: {
		fontSize: 15,
		fontWeight: "700",
		color: "#696969",
		marginRight: 70,
	},
	backButton: {
		flexDirection: "row",
		width: 55,
		height: 55,
		alignSelf: "flex-end",
		justifyContent: "center",
		borderRadius: 25,
		marginTop: 15,
		marginLeft: 20,
		position: "absolute",
	},
});
