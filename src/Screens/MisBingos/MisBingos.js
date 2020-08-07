import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import { useNavigation } from "@react-navigation/native";
import {Icon} from 'react-native-elements';

export default function MisBingos(props) {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [bingos, setBingos] = useState([]);
	let bingosToArray = [];

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${userFbData.uid}/bingos`)
			.on("value", (snapshot) => {
				setBingos(snapshot.val());
			});
	}, []);

	const { width, height } = Dimensions.get('window');

	if (bingos) {
		Object.keys(bingos).forEach((key, i) => {
			bingosToArray[i] = bingos[key];
		});

		return (
			<View style={styles.mainView}>
			<HeaderView props={props} />
				<ImageBackground
				style={{width: width, height:height * 0.91}}
				source={{uri:'https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2Ftelebingo%20jpg.jpg?alt=media&token=f6b9100a-63f4-460b-8df5-42f3fca67b6d'}}>
				<View style={{marginLeft: 10}}>
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
					</ImageBackground>
				{/* <MainImage />
				<Text style={[styles.titles, { margin: 15 }]}>Mis Bingos</Text>
				<ScrollView>
					{bingosToArray.map((bingos, i) => {
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
											Cartones:{"  "}
										</Text>
										<Text style={{ color: "#03255F", marginRight: 20 }}>
											{bingos.cartones}
										</Text>
										<Text
											style={{
												fontWeight: "bold",
												color: "#03255F",
												fontSize: 15,
											}}
										>
											Numero de juego:{"  "}
										</Text>
										<Text style={{ color: "#03255F", marginRight: 20 }}>
											{bingos.numero_de_juego}
										</Text>
										<Text
											style={{
												fontWeight: "bold",
												color: "#03255F",
												fontSize: 15,
											}}
										>
											Ganador:{"  "}
										</Text>
										{bingos.ganador ? (
											<Text style={{ color: "#03255F", marginRight: 20 }}>
												Si
											</Text>
										) : (
											<Text style={{ color: "#03255F", marginRight: 20 }}>
												no
											</Text>
										)}
									</View>
									<Text style={{ fontWeight: "bold", color: "#696969" }}>
										{bingos.total}CLP {"  "} {bingos.fecha}
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
											{bingos.id}
										</Text>
									</View>
								</View>
							</View>
						);
					})}
				</ScrollView>
				<View style={[styles.buttons, { marginTop: 40, marginBottom: 40 }]}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.buttonPagar}
					>
						<Text style={styles.textSubmit}>Volver</Text>
					</TouchableOpacity>
				</View> */}
			</View>
		);
	} else {
		return (
			<View style={styles.mainView}>
				<HeaderView props={props} />
				<ImageBackground
				style={{width: width, height:height * 0.91}}
				source={{uri:'https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2Ftelebingo%20jpg.jpg?alt=media&token=f6b9100a-63f4-460b-8df5-42f3fca67b6d'}}>
				<View style={{marginLeft: 10}}>
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
					</ImageBackground>
				{/* <MainImage />
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
				<View style={[styles.buttons, { marginTop: 40, marginBottom: 40 }]}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.buttonPagar}
					>
						<Text style={styles.textSubmit}>Volver</Text>
					</TouchableOpacity>
				</View> */}
			</View>
		);
	}
}
