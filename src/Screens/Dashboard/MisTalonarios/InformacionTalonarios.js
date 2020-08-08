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
import firebase from "../../../../Firebase/Firebase";
import Divider from "react-native-divider";
import { sub } from "react-native-reanimated";

export default function InformacionAlcancia(props) {
	const navigation = useNavigation();
	const content = props.route.params.content;
	const uid = props.route.params.uid;
	const key = props.route.params.key;
	const subtipo = props.route.params.subtipo;
	const [recovered, setRecovered] = useState(false);
	const [resetTalonario, setResetTalonario] = useState(false);
	const indice_talonario = content.talonario_numero - 1;
	console.log(content);

	const recovering = () => {
		if (recovered === false) {
			firebase
				.database()
				.ref()
				.child(`Users/${uid}/talonarios/${key}/`)
				.update({
					recuperado: true,
				});
			firebase
				.database()
				.ref()
				.child(`Talonarios/${indice_talonario}/`)
				.update({
					recuperado: true,
				});
			setRecovered(true);
			navigation.navigate("Talonarios");
		} else {
			console.log("ERROR6");
		}
	};

	const resetCounterBox = () => {
		if (resetTalonario === false) {
			firebase
				.database()
				.ref()
				.child(`Users/${uid}/talonarios/${key}/`)
				.update({
					recuperado: false,
					reset: true,
					asignado_tercero: false,
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
				.child(`Talonarios/${indice_talonario}/`)
				.update({
					recuperado: false,
					reset: true,
					asignado_tercero: true,
					tercero: {
						nombre: null,
						correo: null,
						direccion: null,
						telefono: null,
						rut: null,
					},
				});
			setResetTalonario(true);
			navigation.navigate("Talonarios");
		} else {
			console.log("ERROR6");
		}
	};

	if (content && subtipo) {
		return (
			<SafeAreaView>
				<Header />
				<Text style={styles.infoTitle}>Información Talonarios</Text>
				<View style={styles.infoView}>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Numero De Talonario:</Text>
						<Text style={styles.textValue}> {content.talonario_numero}</Text>
					</View>
					{content.asigando_externo ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignado Externo:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignado Externo:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					{content.asignado_tercero ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignado A Tercero:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignado A Tercero:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					{content.asignado_usuario ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignado A Usuario:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignado A Usuario:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Correlativo:</Text>
						<Text style={styles.textValue}> {content.correlativo}</Text>
					</View>
				</View>
				{subtipo === "Leo/Leon" ? (
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
									{content.recuperado === false ? (
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
													onPress={resetCounterBox}
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
									{content.recuperado === false ? (
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
													onPress={resetCounterBox}
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
		fontSize: 15,
		fontWeight: "bold",
		color: "#03255f",
	},
	textValue: {
		fontSize: 15,
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
