import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../Utils/validation";
import { Input, Icon, CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../Utils/Loading";

export default function DonarCompany(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [rutEmpresa, setRutEmpresa] = useState(userFbData.rutEmpresa);
	const [email, setEmail] = useState(userFbData.email);
	const [telefono, setTelefono] = useState(userFbData.telefono);
	const [representante, setRepresentante] = useState(userFbData.representante);
	const [aporte, setAporte] = useState();
	const [checked, setChecked] = useState(false);

	const submit = () => {
		let errors = [];
		if (
			!nombre ||
			!rutEmpresa ||
			!aporte ||
			!email ||
			!telefono ||
			!representante
		) {
			toastRef.current.show("Todos Los Campos Son Obligatorios.");
			if (!nombre) errors.nombre = true;
			if (!rutEmpresa) errors.rutEmpresa = true;
			if (!aporte) errors.aporte = true;
			if (!email) errors.email = true;
			if (!telefono) errors.telefono = true;
			if (!representante) errors.representante = true;
		} else if (!validateEmail(email)) {
			toastRef.current.show("Correo electrónico incorrecto.");
			errors.email = true;
		} else {
			setLoading(true);
			const key = firebase.database().ref().push().key;
			firebase
				.database()
				.ref()
				.child(`Users/${userFbData.uid}/aportes/${key}/`)
				.set({
					aporte: aporte,
					nombre: nombre,
					rutEmpresa: rutEmpresa,
					email: email,
					telefono: telefono,
					representante: representante,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
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
					nombre: nombre,
					rutEmpresa: rutEmpresa,
					email: email,
					telefono: telefono,
					representante: representante,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
					certificado: checked,
				})
				.then((response) => {
					setLoading(false);
					setChecked(false);
					toastRef.current.show("Su donación ha sido exitosa.");
					handleReset();
					navigation.navigate('Home');
				})
				.catch((err) => {
					toastRef.current.show("Ha ocurrido un problema.");
				});
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setNombre(userFbData.nombre);
		setRutEmpresa(userFbData.rutEmpresa);
		setEmail(userFbData.email);
		setTelefono(userFbData.telefono);
		setRepresentante(userFbData.representante);
		setAporte("");
	};
	console.log(checked);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<HeaderView props={props} />
			</View>
			<View style={styles.imageContainer}>
				<MainImage />
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

const { width } = Dimensions.get("window");

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
		marginLeft: 50,
		marginRight: 50,
		alignItems: "center",
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
		width: "100%",
		backgroundColor: "#FFF",
		margin: 8,
		borderRadius: 20,
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
	buttonPagar: {
		width: 150,
		height: 40,
		backgroundColor: "#F5C300",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		margin: 20,
	},
	comeBack: {
		alignSelf: "flex-start",
		borderRadius: 25,
		marginLeft: 15,
		marginTop: -70,
		position: "absolute",
	},
});
