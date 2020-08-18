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

export default function talonarios() {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [talonarios, setTalonarios] = useState([]);
	let talonariosToArray = [];

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${userFbData.uid}/talonarios/`)
			.on("value", (snapshot) => {
				setTalonarios(snapshot.val());
			});
	}, []);

	if (talonarios && userFbData) {
		Object.keys(talonarios).forEach((key, i) => {
			talonariosToArray[i] = talonarios[key];
		});

		return (
			<SafeAreaView style={styles.mainView}>
				<Header />
				<Text style={styles.infoTitle}>Asignar talonarios</Text>
				<ScrollView>
					{talonariosToArray.map((talonario, i) => {
						return !talonario.asignado_tercero ? (
							<View key={i} style={styles.infoView}>
								<View style={styles.textBox}>
									<Text style={styles.textKey}>Numero De talonario:</Text>
									<Text style={styles.textValue}>
										{talonario.talonario_numero}
									</Text>
								</View>
								<View style={styles.textBox}>
									<Text style={styles.textKey}>Correlativo</Text>
									<Text style={styles.textValue}>{talonario.correlativo}</Text>
								</View>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("Asignar", {
											content: talonario,
											uid: userFbData.uid,
											key: i,
										})
									}
									key={i}
									style={styles.backButton}
								>
									<Icon
										type="FontAwesome5"
										name="plus-circle"
										size={50}
										color="green"
										style={styles.icon}
									/>
								</TouchableOpacity>
							</View>
						) : null;
					})}
				</ScrollView>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.mainView}>
				<Header />
				<Text style={styles.infoTitle}>Asignar talonarios</Text>
				<ScrollView>
					<View style={{ alignItems: "center", marginTop: 30 }}>
						<Text
							style={{ fontWeight: "bold", color: "#03255F", fontSize: 15 }}
						>
							No tiene Talonarios asignados.
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
		marginLeft: 20,
		position: "absolute",
	},
	icon: {
		marginTop: 3,
	},
});
