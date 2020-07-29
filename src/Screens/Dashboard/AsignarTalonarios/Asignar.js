import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../../Utils/Style";
import usePreference from "../../../Hooks/usePreferences";
import firebase from "../../../../Firebase/Firebase";
import Header from "../../../components/Layouts/Header";
import { useNavigation } from "@react-navigation/native";

export default function Asignar() {
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
				<Text style={[styles.titles, { margin: 15 }]}>Mis Talonarios</Text>
				<ScrollView>
					
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
