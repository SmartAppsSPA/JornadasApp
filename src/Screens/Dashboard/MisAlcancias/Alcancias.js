import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../../Utils/Style";
import usePreference from "../../../Hooks/usePreferences";
import firebase from "../../../../Firebase/Firebase";
import Header from "../../../components/Layouts/Header";
import {useNavigation} from '@react-navigation/native';
 
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

	if (alcancias) {
		Object.keys(alcancias).forEach((key, i) => {
			alcanciasToArray[i] = alcancias[key];
		});

		return (
			<View style={styles.mainView}>
				<Header />
				<Text style={[styles.titles, { margin: 15 }]}>Mis Alcancias</Text>
				<ScrollView>
					{alcanciasToArray.map((alcancia, i) => {
						return (
							<TouchableOpacity
							onPress={()=> navigation.navigate('InformacionAlcancia', {alcancia: alcancia.alcancia_numero, uid: userFbData.uid, content: alcancia})}
								key={i}
								style={{ margin: 10, backgroundColor: "#fff" }}
							>
								<View style={{ alignItems: "flex-start", marginLeft: 15 }}>
									<View style={{ flexDirection: "row" }}>
										<Text
											style={{
												fontWeight: "bold",
												color: "#03255F",
												fontSize: 15,
											}}
										>
											Numero:{"  "}
										</Text>
										<Text style={{ fontWeight: "bold", color: "#696969" }}>
											{alcancia.alcancia_numero}
										</Text>
									</View>
									{alcancia.asignada_externo === true ||
									alcancia.asignada_tercero === true ||
									alcancia.asignada_usuario === true ? (
										<View style={{ flexDirection: "row" }}>
											<Text
												style={{
													fontWeight: "bold",
													color: "#03255F",
													fontSize: 15,
												}}
											>
												Asignada:{"  "}
											</Text>
											<Text style={{ fontWeight: "bold", color: "#696969" }}>
												si
											</Text>
										</View>
									) : (
										<View style={{ flexDirection: "row" }}>
											<Text
												style={{
													fontWeight: "bold",
													color: "#03255F",
													fontSize: 15,
												}}
											>
												Asignada:{"  "}
											</Text>
											<Text style={{ fontWeight: "bold", color: "#696969" }}>
												No
											</Text>
										</View>
									)}
									<View style={{ flexDirection: "row" }}>
										<Text
											style={{
												fontWeight: "bold",
												color: "#03255F",
												fontSize: 15,
											}}
										>
											Codigo de barra:{"  "}
										</Text>
										<Text style={{ fontWeight: "500", color: "#696969" }}>
											{alcancia.codigo_barra}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		);
	} else {
		return (
			<View style={styles.mainView}>
				<View style={{ alignItems: "center", marginTop: 30 }}>
                <Header />
				<Text style={[styles.titles, { margin: 15 }]}>Mis Alcancias</Text>
					<Text
						style={{
							fontWeight: "bold",
							color: "#03255F",
							fontSize: 15,
						}}
					>
						No tiene alcancias asignadas.
					</Text>
				</View>
			</View>
		);
	}
}
