import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import {useNavigation} from '@react-navigation/native';

export default function MisBonos(props){
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
			<View style={styles.mainView}>
				<HeaderView />
				<MainImage />
				<Text style={[styles.titles, { margin: 15 }]}>Mis Bonos</Text>
				<ScrollView>
					{bonosToArray.map((Bonos, i) => {
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
											Cantidad:{"  "}
										</Text>
										<Text style={{ color: "#03255F" }}>
											{Bonos.cantidad}
										</Text>
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

