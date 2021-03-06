import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import HeaderView from "../../components/Layouts/Header";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Input, Icon } from "react-native-elements";
import Loading from "../../Utils/Loading";
import axios from "axios";
import AlcanciaImage from "../../components/Layouts/AlcanciaImage";

export default function DonarUser(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [aporte, setAporte] = useState();
	const [transbank, setTransbank] = useState(null);
	const [numeroOrden, setNumeroOrden] = useState();

	useEffect(() => {
		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero")
			.limitToLast(1)
			.on("value", (snapshot) => {
				setNumeroOrden(snapshot.val());
			});
	}, []);

	function submit() {
		let orderToArray = [];
		let errors = [];
		if (!nombre || !apellido || !aporte) {
			toastRef.current.show("Todos Los Campos Son Obligatorios.");
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!aporte) errors.aporte = true;
		} else {
			setLoading(true);
			firebase
				.database()
				.ref("Transbank")
				.orderByChild("numero")
				.limitToLast(1)
				.on("value", (snapshot) => {
					setNumeroOrden(snapshot.val());
				});
			if (numeroOrden) {
				Object.keys(numeroOrden).forEach((key, i) => {
					orderToArray[i] = numeroOrden[key];
				});
				let key = parseInt(orderToArray[0].numero_orden.split('-')[1]) + 1;
				console.log(numeroOrden);
				firebase
					.database()
					.ref()
					.child(`Transbank/orden_${key}`)
					.set({
						item: "Aporte",
						tipo: "Usuario",
						aporte: aporte,
						nombre: nombre,
						apellido: apellido,
						telefono: userFbData.telefono,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden:  'JMAGALLANICAS-' + key,
						numero: key,
						estado_de_pago: "Pendiente",
						uid: userFbData.uid,
						plataforma: "App",
						email: userFbData.email,
					});
				firebase
					.database()
					.ref()
					.child(`Users/${userFbData.uid}/aportes/${key}`)
					.set({
						aporte: aporte,
						nombre: nombre,
						apellido: apellido,
						telefono: userFbData.telefono,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden:  'JMAGALLANICAS-' + key,
						estado_de_pago: "Pendiente",
						uid: userFbData.uid,
						email: userFbData.email,
					});

				firebase
					.database()
					.ref()
					.child(`Donaciones/${key}`)
					.set({
						tipo: "Usuario",
						aporte: aporte,
						nombre: nombre,
						apellido: apellido,
						telefono: userFbData.telefono,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden:  'JMAGALLANICAS-' + key,
						estado_de_pago: "Pendiente",
						uid: userFbData.uid,
						email: userFbData.email,
						plataforma: "App",
					})
					.then((res) => {
						axios({
							method: "post",
							url: "https://appjornadasmagallanicas.cl/api/api/transactions",
							data: {
								orden_compra:  'JMAGALLANICAS-' + key,
								sessionID: "DonacionApp",
								monto: aporte,
								cantidad: 1,
								nombre: nombre,
								apellido: apellido,
								email: userFbData.email,
								uid: userFbData.uid,
							},
						}).then((response) => {
							setTransbank(response.data);
							navigation.navigate("Pago Aporte", { transbank: response.data, orden_de_compra: key });
							setLoading(false);
						});
						handleReset();
					})
					.catch((err) => {
						setLoading(false);
						toastRef.current.show(
							"Ha ocurrido un problema, intente nuevamente."
						);
					});
			} else {
				setLoading(false);
				toastRef.current.show("Ha ocurrido un problema, intente nuevamente.");
			}
		}
		setFormError(errors);
	}

	const handleReset = () => {
		setNombre(userFbData.nombre);
		setApellido(userFbData.apellido);
		setAporte("");
	};

	return (
		<SafeAreaView style={styles.mainView}>
			<View style={styles.headerContainer}>
				<HeaderView props={props} />
			</View>
			<View style={styles.imageContainer}>
				<AlcanciaImage />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Aporte</Text>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputTitle}>Nombre(s)</Text>
				<Input
					name="nombre"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize="none"
					textContentType="username"
					placeholder="Fran..."
					defaultValue={nombre}
					onChange={(e) => setNombre(e.nativeEvent.text)}
					rightIcon={
						formError.nombre ? (
							<Icon type="font-awesome" name="exclamation-circle" color="red" />
						) : (
							<Icon
								type="Fontawesome5"
								name="edit"
								iconStyle={styles.iconRight}
							/>
						)
					}
				/>
				<Text style={styles.inputTitle}>apellido(s)</Text>
				<Input
					name="apellido"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize="none"
					textContentType="middleName"
					placeholder="Zun..."
					defaultValue={apellido}
					onChange={(e) => setApellido(e.nativeEvent.text)}
					rightIcon={
						formError.apellido ? (
							<Icon type="font-awesome" name="exclamation-circle" color="red" />
						) : (
							<Icon
								type="Fontawesome5"
								name="edit"
								iconStyle={styles.iconRight}
							/>
						)
					}
				/>
				<Text style={styles.inputTitle}>Aporte</Text>
				<Input
					name="aporte"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize="none"
					placeholder="Ingrese Aporte..."
					keyboardType="numeric"
					defaultValue={aporte}
					onChange={(e) => setAporte(e.nativeEvent.text)}
					rightIcon={
						formError.aporte ? (
							<Icon type="font-awesome" name="exclamation-circle" color="red" />
						) : (
							<Icon
								type="Fontawesome5"
								name="edit"
								iconStyle={styles.iconRight}
							/>
						)
					}
				/>
			</View>
			<TouchableOpacity
				onPress={() => handleReset()}
				style={styles.buttonFormReset}
			>
				<Text style={styles.formReset}>Reiniciar Formulario</Text>
			</TouchableOpacity>
			<View style={styles.submitContainer}>
				<TouchableOpacity onPress={submit} style={styles.buttonPagar}>
					<Text style={styles.textSubmit}>Donar</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.backContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}
					style={styles.comeBack}
				>
					<Icon raised name="arrow-left" type="font-awesome" color="#03255F" />
				</TouchableOpacity>
			</View>
			<Loading isVisible={loading} text="procesando." />
		</SafeAreaView>
	);
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 11,
	},
	headerContainer: {
		flex: 1,
	},
	imageContainer: {
		flex: 2,
	},
	titleContainer: {
		flex: 1,
	},
	inputContainer: {
		flex: 5,
		width: width,
		alignItems: "center",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#34495E",
		backgroundColor: "#A9B4C0",
		paddingVertical: 25,
	},
	submitContainer: {
		flex: 1,
	},
	backContainer: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		color: "#03255F",
		fontWeight: "bold",
		textAlign: "center",
		margin: 5,
	},
	inputTitle: {
		fontSize: 15,
		color: "#03255F",
		fontWeight: "bold",
		alignSelf: "center",
		justifyContent: "center",
	},
	input: {
		width: width * 0.75,
		height: height * 0.05,
		backgroundColor: "#FFF",
		margin: 8,
		borderRadius: 30,
		borderWidth: 1,
		borderColor: "#34495E",
	},
	inputText: {
		fontSize: 12,
		color: "#03255F",
		fontWeight: "bold",
	},
	inputUnderContainer: {
		borderBottomWidth: 0,
	},
	iconRight: {
		color: "#c1c1c1",
	},
	error: {
		borderColor: "#940c0c",
		borderWidth: 1,
		borderBottomColor: "#940c0c",
		borderBottomWidth: 1,
		borderRadius: 5,
	},
	textSubmit: {
		fontSize: 17.5,
		color: "white",
		fontWeight: "bold",
	},
	buttonFormReset: {
		flexDirection: "row",
		width: width * 0.5,
		height: height * 0.04,
		marginTop: 20,
		backgroundColor: "#03255F",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	formReset: {
		fontSize: 15,
		color: "#FFF",
		fontWeight: "bold",
		marginTop: -3,
	},
	buttonPagar: {
		width: width * 0.5,
		height: height * 0.04,
		backgroundColor: "green",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		margin: 10,
	},
	comeBack: {
		alignSelf: "flex-start",
		borderRadius: 25,
		marginLeft: 15,
		marginTop: -70,
		position: "absolute",
	},
});
