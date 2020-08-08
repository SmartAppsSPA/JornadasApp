import React, { useState, useRef } from "react";
import { Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import { validateEmail } from "./validation";
import firebase from "../../Firebase/Firebase";
import Logo from "./Logo";
import Loading from "../Utils/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-animatable";
import Toast from "react-native-easy-toast";
import { size, isEmpty } from "lodash";

export default function Register(props) {
	const toastRef = useRef();
	const [formCompanyData, setFormCompanytData] = useState(defaultCompanyValue);
	const [formErrorCom, setFormErrorCom] = useState({});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setshowRepeatPassword] = useState(false);

	const registerCompany = () => {
		let errors = {};
		if (
			isEmpty(formCompanyData.nombreCom) ||
			isEmpty(formCompanyData.representante) ||
			isEmpty(formCompanyData.rutEmpresa) ||
			isEmpty(formCompanyData.email) ||
			isEmpty(formCompanyData.telefono) ||
			isEmpty(formCompanyData.password) ||
			isEmpty(formCompanyData.repeatPassword)
		) {
			toastRef.current.show("Todos los campos son obligatorios.");
			if (isEmpty(formCompanyData.nombreCom)) errors.nombreCom = true;
			if (isEmpty(formCompanyData.representante)) errors.representante = true;
			if (isEmpty(formCompanyData.rutEmpresa)) errors.rutEmpresa = true;
			if (isEmpty(formCompanyData.email)) errors.email = true;
			if (isEmpty(formCompanyData.telefono)) errors.telefono = true;
			if (isEmpty(formCompanyData.password)) errors.password = true;
			if (isEmpty(formCompanyData.repeatPassword)) errors.repeatPassword = true;
		} else if (!validateEmail(formCompanyData.email)) {
			toastRef.current.show("El email ingresado no es correcto.");
			errors.email = true;
		} else if (formCompanyData.password !== formCompanyData.repeatPassword) {
			toastRef.current.show("Las contraseñas no coinciden.");
			errors.password = true;
			errors.repeatPassword = true;
		} else if (size(formCompanyData.password) < 6) {
			toastRef.current.show(
				"La contraseña debe tener un minimo de 6 caracteres"
			);
			errors.password = true;
			errors.repeatPassword = true;
		} else {
			setLoading(true);
			firebase
				.auth()
				.createUserWithEmailAndPassword(
					formCompanyData.email,
					formCompanyData.password
				)
				.then((user) => {
					setLoading(false);
					firebase.auth().currentUser.updateProfile({
						displayName: formCompanyData.nombreCom,
					});
					let uid = user.user.uid;
					firebase
						.database()
						.ref()
						.child("Users/" + uid)
						.set({
							uid: uid,
							tipo: "Company",
							nombre: formCompanyData.nombreCom,
							representante: formCompanyData.representante,
							rutEmpresa: formCompanyData.rutEmpresa,
							telefono: formCompanyData.telefono,
							email: formCompanyData.email,
							password: formCompanyData.password,
						});
				})
				.catch(() => {
					setLoading(false);
					toastRef.current.show("El Email ya esta en uso.");
					setFormErrorCom({
						nombreCom: true,
						representante: true,
						rutEmpresa: true,
						email: true,
						telefono: true,
						password: true,
						repeatPassword: true,
					});
				});
		}
		setLoading(false);
		setFormErrorCom(errors);
	};
	return (
		<SafeAreaView style={styles.background}>
			<ScrollView>
				<Logo />
				<View style={styles.inputContainer}>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Nombre o Razón Social"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								nombreCom: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.nombreCom ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="domain"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Representante Legal"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								representante: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.representante ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="contacts"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Rut de La Empresa"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								rutEmpresa: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.rutEmpresa ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="dialpad"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Correo Electrónico"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								email: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.email ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="at"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Teléfono De Contacto"
						placeholderTextColor="#969696"
						keyboardType="number-pad"
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								telefono: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.telefono ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="cellphone-android"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Contraseña"
						placeholderTextColor="#969696"
						secureTextEntry={showPassword ? false : true}
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								password: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.password ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name={showPassword ? "eye-off-outline" : "eye-outline"}
									iconStyle={styles.iconRight}
									onPress={() => setShowPassword(!showPassword)}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="Repetir Contraseña"
						placeholderTextColor="#969696"
						secureTextEntry={showRepeatPassword ? false : true}
						onChange={(e) =>
							setFormCompanytData({
								...formCompanyData,
								repeatPassword: e.nativeEvent.text,
							})
						}
						rightIcon={
							formErrorCom.repeatPassword ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
									iconStyle={styles.iconRight}
									onPress={() => setshowRepeatPassword(!showRepeatPassword)}
								/>
							)
						}
					/>
				</View>
				<TouchableOpacity
					onPress={registerCompany}
					style={styles.buttonRegistrarse}
				>
					<Text style={styles.text}>Registrarse</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("Principal")}
					style={styles.button}
				>
					<Text style={styles.text}>Volver</Text>
				</TouchableOpacity>
				<Loading isVisible={loading} text="Creando Cuenta" />
			</ScrollView>
			<Toast
				ref={toastRef}
				position="center"
				style={{ backgroundColor: "#696969", opacity: 0.9, borderRadius: 20 }}
				fadeInduration={1000}
				fadeOutDuration={1000}
				textStyle={{ fontWeight: "bold", color: "#FFF", textAlign: "center" }}
			/>
		</SafeAreaView>
	);
}

function defaultCompanyValue() {
	return {
		nombreCom: "",
		representante: "",
		rutEmpresa: "",
		email: "",
		telefono: "",
		password: "",
		repeatPassword: "",
	};
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#03255F",
		height: "100%",
		alignItems: "center",
	},
	text: {
		fontSize: 15,
		color: "white",
		fontWeight: "bold",
	},
	inputContainer: {
		marginLeft: 50,
		marginRight: 50,
		alignItems: "center",
	},
	input: {
		width: 250,
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
	button: {
		width: 250,
		height: 30,
		backgroundColor: "#F5C300",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
	},

	buttonRegistrarse: {
		width: 250,
		height: 30,
		backgroundColor: "#28a745",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		marginTop: 5,
		marginBottom: 5,
		borderRadius: 10,
		borderWidth: 1,
	},
});
