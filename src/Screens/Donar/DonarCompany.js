import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import HeaderView from "../../components/Layouts/Header";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../Utils/validation";
import { Input, Icon, CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../Utils/Loading";
import axios from "axios";
import AlcanciaImage from "../../components/Layouts/AlcanciaImage";

export default function DonarCompany(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData} = usePreference();
	const [formError, setFormError] = useState({});
	const [email, setEmail] = useState(userFbData.email);
	const [telefono, setTelefono] = useState(userFbData.telefono);
	const [representante, setRepresentante] = useState(userFbData.representante);
	const [aporte, setAporte] = useState();
	const [checked, setChecked] = useState(false);
	const [transbank, setTransbank] = useState(null);
	const [numeroOrden, setNumeroOrden] = useState();

	useEffect(() => {
		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero_orden")
			.limitToLast(1)
			.on("value", (snapshot) => {
				setNumeroOrden(snapshot.val());
				console.log(numeroOrden);
			});
	}, []);

	const submit = () => {
		let orderToArray = [];
		let errors = [];
		if (!aporte || !email.trim() || !telefono || !representante) {
			toastRef.current.show("Todos Los Campos Son Obligatorios.");
			if (!aporte) errors.aporte = true;
			if (!email.trim()) errors.email = true;
			if (!telefono) errors.telefono = true;
			if (!representante) errors.representante = true;
		} else if (!validateEmail(email.trim())) {
			toastRef.current.show("Correo electrónico incorrecto.");
			errors.email = true;
		} else {
			setLoading(true);
			firebase
				.database()
				.ref("Transbank")
				.orderByChild("numero_orden")
				.limitToLast(1)
				.on("value", (snapshot) => {
					setNumeroOrden(snapshot.val());
				});
			if (numeroOrden) {
				console.log(numeroOrden);
				Object.keys(numeroOrden).forEach((key, i) => {
					orderToArray[i] = numeroOrden[key];
				});
				let key = parseInt(orderToArray[0].numero_orden) + 1;
				console.log(key);
				firebase
					.database()
					.ref()
					.child(`Transbank/orden_${key}`)
					.set({
						aporte: aporte,
						nombre: userFbData.nombre,
						rutEmpresa: userFbData.rutEmpresa,
						email: email,
						telefono: telefono,
						representante: representante,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden: key,
						estado_de_pago: "Pendiente",
						forma_de_pago: "",
						uid: userFbData.uid,
						certificado: checked,
						plataforma: "App",
					});
				firebase
					.database()
					.ref()
					.child(`Users/${userFbData.uid}/aportes/${key}/`)
					.set({
						aporte: aporte,
						nombre: userFbData.nombre,
						rutEmpresa: userFbData.rutEmpresa,
						email: email,
						telefono: telefono,
						representante: representante,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden: key,
						estado_de_pago: "Pendiente",
						forma_de_pago: "",
						uid: userFbData.uid,
						certificado: checked,
					});
				firebase
					.database()
					.ref()
					.child(`Donaciones/${key}/`)
					.set({
						aporte: aporte,
						nombre: userFbData.nombre,
						rutEmpresa: userFbData.rutEmpresa,
						email: email,
						telefono: telefono,
						representante: representante,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden: key,
						estado_de_pago: "Pendiente",
						forma_de_pago: "",
						uid: userFbData.uid,
						certificado: checked,
					})
					.then((res) => {
						axios({
							method: "post",
							url: "https://appjornadasmagallanicas.cl/api/api/transactions",
							data: {
								orden_compra: key,
								sessionID: userFbData.nombre,
								item: "Aporte",
								tipo: "Empresa",
								monto: aporte,
								cantidad: 1,
								nombre: representante,
								apellido: representante,
								email: userFbData.email,
								plataforma: "App",
							},
						}).then((response) => {
							setTransbank(response.data);
							console.log(transbank);
							navigation.navigate("Pago Aporte", { transbank: response.data });
						});
						handleReset();
						setLoading(false);
					})
					.catch((err) => {
						setLoading(false);
						toastRef.current.show(
							"Ha ocurrido un problema, intente nuevamente."
						);
					});
			} else {
				setLoading(false);
				console.log("CATCH2");
				toastRef.current.show("Ha ocurrido un problema, intente nuevamente.");
			}
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setEmail(userFbData.email);
		setTelefono(userFbData.telefono);
		setRepresentante(userFbData.representante);
		setAporte("");
		setChecked(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<HeaderView props={props} />
			</View>
			<View style={styles.imageContainer}>
				<AlcanciaImage />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Aporte Empresa</Text>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputTitle}>Correo Electrónico </Text>
				<Input
					name="email"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize="none"
					placeholder="ejemplo@empresa.com..."
					defaultValue={email}
					onChange={(e) => setEmail(e.nativeEvent.text)}
					rightIcon={
						formError.email ? (
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
				<Text style={styles.inputTitle}>Teléfono de Contacto</Text>
				<Input
					name="telefono"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize="none"
					placeholder="+56 9 1111 1111..."
					defaultValue={telefono}
					keyboardType="phone-pad"
					keyboardAppearance="dark"
					onChange={(e) => setTelefono(e.nativeEvent.text)}
					rightIcon={
						formError.telefono ? (
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
				<Text style={styles.inputTitle}>Nombre De Contacto</Text>
				<Input
					name="representante"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize="none"
					textContentType="nickname"
					placeholder="fran.. zun..."
					defaultValue={representante}
					onChange={(e) => setRepresentante(e.nativeEvent.text)}
					rightIcon={
						formError.representante ? (
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
					placeholder="Ingrese su Aporte..."
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
				<CheckBox
					center
					title="Solicitar certificado de donación. "
					onPress={() => setChecked(!checked)}
					checked={checked}
				/>
			</View>
			<TouchableOpacity
				onPress={() => handleReset(userFbData)}
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
			<Loading isVisible={loading} text="Procesando" />
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
