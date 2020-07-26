import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import {useNavigation} from '@react-navigation/native';

export default function MisDonaciones() {
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
			<View style={styles.mainView}>
				<HeaderView />
				<MainImage />
				<Text style={[styles.titles, { margin: 15 }]}>Mis Donaciones</Text>
				<ScrollView>
					{aportesToArray.map((aporte, i) => {
						return (
							<View key={i} style={{ margin: 10, backgroundColor: "#fff" }}>
								<View style={{ alignItems: "center" }}>
									<View style={{ flexDirection: "row" }}>
										<Text
											style={{
												fontWeight: "bold",
												color: "#03255F",
												fontSize: 15,
											}}
										>
											Nombre:{"  "}
										</Text>
										<Text style={{ color: "#03255F" }}>
											{aporte.nombre} {aporte.apellido}
										</Text>
									</View>
									<Text style={{ fontWeight: "bold", color: "#696969" }}>
										{numberFormat(aporte.aporte)}CLP {"  "} {aporte.fecha}
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
											{aporte.id}
										</Text>
									</View>
								</View>
							</View>
						);
					})}
				</ScrollView>
				<View style={[styles.buttons, {marginTop: 40, marginBottom:40}]}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.buttonPagar}
					>
						<Text style={styles.textSubmit}>Volver</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	} else {
		return (
			<View style={styles.mainView}>
				<HeaderView />
				<MainImage />
				<View style={{ alignItems: "center", marginTop: 30 }}>
					<Text style={styles.form}>Mis Donaciones</Text>
					<Text
						style={{
							fontWeight: "bold",
							color: "#03255F",
							fontSize: 15,
						}}
					>
						No se registran donaciones
					</Text>
				</View>
				<View style={[styles.buttons, {marginTop: 40, marginBottom:40}]}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.buttonPagar}
					>
						<Text style={styles.textSubmit}>Volver</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
