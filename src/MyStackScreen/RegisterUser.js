import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { validateEmail } from "./validation";
import firebase from "../../Firebase/Firebase";
import Logo from "./Logo";
import Loading from "../Utils/Loading";
import Toast from "react-native-easy-toast";
import { size, isEmpty } from "lodash";

export default function Register(props) {
	const toastRef = useRef();
	const [formUserData, setFormUserData] = useState(defaultUserValue);
	const [formError, setFormError] = useState({});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setshowRepeatPassword] = useState(false);

	const registerUser = () => {
		let errors = {};
		if (
			isEmpty(formUserData.nombre) ||
			isEmpty(formUserData.apellido) ||
			isEmpty(formUserData.email) ||
			isEmpty(formUserData.telefono) ||
			isEmpty(formUserData.password) ||
			isEmpty(formUserData.repeatPassword)
		) {
			toastRef.current.show("Todos los campos son obligatorios.");
			if (isEmpty(formUserData.nombre)) errors.nombre = true;
			if (isEmpty(formUserData.apellido)) errors.apellido = true;
			if (isEmpty(formUserData.email)) errors.email = true;
			if (isEmpty(formUserData.telefono)) errors.telefono = true;
			if (isEmpty(formUserData.password)) errors.password = true;
			if (isEmpty(formUserData.repeatPassword)) errors.repeatPassword = true;
		} else if (!validateEmail(formUserData.email)) {
			toastRef.current.show("El email ingresado no es correcto.");
			errors.email = true;
		} else if (formUserData.password !== formUserData.repeatPassword) {
			toastRef.current.show("Las contraseñas no coinciden.");
			errors.password = true;
			errors.repeatPassword = true;
		} else if (size(formUserData.password) < 6) {
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
					formUserData.email,
					formUserData.password
				)
				.then((user) => {
					setLoading(false);
					firebase.auth().currentUser.updateProfile({
						displayName: formUserData.nombre,
					});
					let uid = user.user.uid;
					firebase
						.database()
						.ref()
						.child("Users/" + uid)
						.set({
							uid: uid,
							tipo: "User",
							nombre: formUserData.nombre,
							apellido: formUserData.apellido,
							email: formUserData.email,
							telefono: formUserData.telefono,
							password: formUserData.password,
						});
				})
				.catch((err) => {
					setLoading(false);
					toastRef.current.show("El Correo electronico ya esta en uso.");
					setFormError({
						nombre: true,
						apellido: true,
						email: true,
						telefono: true,
						password: true,
						repeatPassword: true,
					});
				});
		}
		setLoading(false);
		setFormError(errors);
		console.log(errors);
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
						autoCapitalize='none'
						placeholder="Nombre(s)"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormUserData({ ...formUserData, nombre: e.nativeEvent.text })
						}
						rightIcon={
							formError.nombre ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="rename-box"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						autoCapitalize='none'
						placeholder="Apellido(s)"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormUserData({ ...formUserData, apellido: e.nativeEvent.text })
						}
						rightIcon={
							formError.apellido ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="material-community"
									name="rename-box"
									iconStyle={styles.iconRight}
								/>
							)
						}
					/>
					<Input
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						autoCapitalize='none'
						placeholder="Correo Electronico"
						placeholderTextColor="#969696"
						onChange={(e) =>
							setFormUserData({ ...formUserData, email: e.nativeEvent.text })
						}
						rightIcon={
							formError.email ? (
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
						autoCapitalize='none'
						placeholder="Teléfono De Contacto"
						placeholderTextColor="#969696"
						keyboardType="number-pad"
						onChange={(e) =>
							setFormUserData({
								...formUserData,
								telefono: e.nativeEvent.text,
							})
						}
						rightIcon={
							formError.telefono ? (
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
						autoCapitalize='none'
						placeholder="Contraseña"
						placeholderTextColor="#969696"
						secureTextEntry={showPassword ? false : true}
						onChange={(e) =>
							setFormUserData({ ...formUserData, password: e.nativeEvent.text })
						}
						rightIcon={
							formError.password ? (
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
						autoCapitalize='none'
						placeholder="Repetir Contraseña"
						placeholderTextColor="#969696"
						secureTextEntry={showRepeatPassword ? false : true}
						onChange={(e) =>
							setFormUserData({
								...formUserData,
								repeatPassword: e.nativeEvent.text,
							})
						}
						rightIcon={
							formError.repeatPassword ? (
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
					onPress={registerUser}
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

function defaultUserValue() {
	return {
		nombre: "",
		apellido: "",
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
