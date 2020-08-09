import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Layouts/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { numberFormat } from "../../../Sources/PagoEnLinea/FormatPrice";
import firebase from "../../../../Firebase/Firebase";
import Divider from "react-native-divider";

export default function InformacionAlcancia(props) {
	const navigation = useNavigation();
	const content = props.route.params.content;
	const uid = props.route.params.uid;
	const key = props.route.params.key;
	const subtipo = props.route.params.subtipo;
	const [recovered, setRecovered] = useState(false);
	const [resetAlcancia, setResetAlcancia] = useState(false);
	const indice_alcancia = content.alcancia_numero - 1;

	const recovering = () => {
		if (recovered === false) {
			firebase.database().ref().child(`Users/${uid}/alcancias/${key}/`).update({
				recuperada: true,
			});
			firebase.database().ref().child(`Alcancias/${indice_alcancia}/`).update({
				recuperada: true,
			});
			setRecovered(true);
			navigation.navigate("Alcancias");
		} else {
			console.log("ERROR6");
		}
	};

	const resetBankPot = () => {
		if (resetAlcancia === false) {
			firebase
				.database()
				.ref()
				.child(`Users/${uid}/alcancias/${key}/`)
				.update({
					recuperada: false,
					reset: true,
					asignada_tercero: false,
					tercero: {
						nombre: null,
						correo: null,
						direccion: null,
						telefono: null,
						rut: null,
					},
				});
			firebase
				.database()
				.ref()
				.child(`Alcancias/${indice_alcancia}/`)
				.update({
					recuperada: false,
					reset: true,
					asignada_tercero: true,
					tercero: {
						nombre: null,
						correo: null,
						direccion: null,
						telefono: null,
						rut: null,
					},
				});
			setResetAlcancia(true);
			navigation.navigate("Alcancias");
		} else {
			console.log("ERROR6");
		}
	};

	if (content && subtipo) {
		return (
			<SafeAreaView>
				<Header />
				<Text style={styles.infoTitle}>Información Alcancía</Text>
				<View style={styles.infoView}>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Numero De Alcancia:</Text>
						<Text style={styles.textValue}> {content.alcancia_numero}</Text>
					</View>
					{content.asiganda_externo ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada Externo:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada Externo:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					{content.asignada_tercero ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Tercero:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Tercero:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					{content.asignada_usuario ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Usuario:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Usuario:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Codigo De Barra:</Text>
						<Text style={styles.textValue}> {content.codigo_barra}</Text>
					</View>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Monto Recaudado:</Text>
						<Text style={styles.textValue}>
							{" "}
							{numberFormat(content.monto_recaudad)}
						</Text>
					</View>
				</View>
				{subtipo === "Leo/Leon" || subtipo === "Admin" ? (
					<View>
						{content.tercero ? (
							<View>
								<Text style={styles.infoTitle}>Información de Tercero</Text>
								<View style={styles.infoView}>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Nombre: </Text>
										<Text style={styles.textValue}>
											{content.tercero.nombre}
										</Text>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Email: </Text>
										<Text style={styles.textValue}>
											{content.tercero.correo}
										</Text>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Dirección:</Text>
										<Text style={styles.textValue}>
											{content.tercero.direccion}
										</Text>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Teléfono:</Text>
										<Text style={styles.textValue}>
											{content.tercero.telefono}
										</Text>
									</View>
									{content.recuperada === false ? (
										<View>
											<Divider
												borderColor="#696969"
												color="#696969"
												orientation="center"
											>
												Control
											</Divider>
											<View style={styles.textBox}>
												<Text
													style={[styles.textKey, { marginVertical: 17.5 }]}
												>
													Reiniciar
												</Text>
												<TouchableOpacity
													onPress={resetBankPot}
													style={[styles.reset, { marginVertical: 15 }]}
												>
													<Icon
														type="FontAwesome5"
														name="eraser"
														size={25}
														color="red"
														style={styles.icon}
													/>
												</TouchableOpacity>
											</View>
											<View style={styles.textBox}>
												<Text
													style={[styles.textKey, { marginVertical: 17.5 }]}
												>
													Recuperada
												</Text>
												<TouchableOpacity
													onPress={recovering}
													style={[styles.recovered, { marginVertical: 15 }]}
												>
													<Icon
														type="FontAwesome5"
														name="check-circle"
														size={25}
														color="green"
														style={styles.icon}
													/>
												</TouchableOpacity>
											</View>
										</View>
									) : null}
								</View>
							</View>
						) : null}
						{content.externo ? (
							<View>
								<Text style={styles.infoTitle}>Información de Externo</Text>
								<View style={styles.infoView}>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Nombre: </Text>
										<Text style={styles.textValue}>
											{content.externo.nombre}
										</Text>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Email: </Text>
										<Text style={styles.textValue}>
											{content.externo.correo}
										</Text>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Dirección:</Text>
										<Text style={styles.textValue}>
											{content.externo.direccion}
										</Text>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.textKey}>Teléfono:</Text>
										<Text style={styles.textValue}>
											{content.externo.telefono}
										</Text>
									</View>
								</View>
								{content.recuperada === false ? (
									<View>
										<Divider
											borderColor="#696969"
											color="#696969"
											orientation="center"
										>
											Control
										</Divider>
										<View style={styles.textBox}>
											<Text style={[styles.textKey, { marginVertical: 17.5 }]}>
												Reiniciar
											</Text>
											<TouchableOpacity
												onPress={resetBankPot}
												style={[styles.reset, { marginVertical: 15 }]}
											>
												<Icon
													type="FontAwesome5"
													name="eraser"
													size={25}
													color="red"
													style={styles.icon}
												/>
											</TouchableOpacity>
										</View>
										<View style={styles.textBox}>
											<Text style={[styles.textKey, { marginVertical: 17.5 }]}>
												Recuperada
											</Text>
											<TouchableOpacity
												onPress={recovering}
												style={[styles.recovered, { marginVertical: 15 }]}
											>
												<Icon
													type="FontAwesome5"
													name="check-circle"
													size={25}
													color="green"
													style={styles.icon}
												/>
											</TouchableOpacity>
										</View>
									</View>
								) : null}
							</View>
						) : null}
					</View>
				) : null}

				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Icon
						type="FontAwesome5"
						name="arrow-circle-left"
						size={40}
						color="#34495E"
					/>
				</TouchableOpacity>
			</SafeAreaView>
		);
	} else {
		return null;
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
		paddingHorizontal: 70,
		marginVertical: 10,
		marginHorizontal: 10,
		backgroundColor: "#fff",
		borderWidth: 0.05,
		borderRadius: 5,
	},
	textBox: {
		flexDirection: "row",
	},
	textKey: {
		flex: 1,
		marginLeft: 3,
		fontSize: 12.5,
		fontWeight: "bold",
		color: "#03255f",
	},
	textValue: {
		fontSize: 12.5,
		fontWeight: "700",
		color: "#696969",
	},
	backButton: {
		flexDirection: "row",
		width: 55,
		height: 55,
		alignSelf: "flex-start",
		justifyContent: "center",
		borderRadius: 25,
		marginLeft: 20,
		position: "absolute",
		marginTop: 145,
	},
});
