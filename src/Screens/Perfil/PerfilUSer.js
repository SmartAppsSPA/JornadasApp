import React, { useState } from "react";
import {
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	SafeAreaView,
	Dimensions,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import firebase from "../../../Firebase/Firebase";
import { useNavigation } from "@react-navigation/native";
import usePreference from "../../Hooks/usePreferences";
import MainImage from "../../components/Layouts/MainImage";
import HeaderView from "../../components/Layouts/Header";
import Loading from "../../Utils/Loading";
import { Restart } from "fiction-expo-restart";

export default function PerfilUSer(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [telefono, setTelefono] = useState(userFbData.telefono);

	const ActualizarDatos = () => {
		let errors = {};
		if (!nombre || !apellido || !telefono) {
			toastRef.current.show("Todos los campos son obligatorios");
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!telefono) errors.telefono = true;
		} else {
			setLoading(true);
			firebase
				.database()
				.ref()
				.child(`Users/${userFbData.uid}/`)
				.update({
					nombre: nombre,
					apellido: apellido,
					telefono: telefono,
				})
				.then((response) => {
					setLoading(false);
					toastRef.current.show("Datos actualizados con exito");
					handleReset();
					Restart();
				})
				.catch((err) => {
					setLoading(false);
					toastRef.current.show("Algo anda mal.");
					setFormError(errors);
					setUserFbData();
				});
		}
	};

	function handleReset() {
		return {
			nombre: userFbData.nombre,
			apellido: userFbData.apellido,
			telefono: userFbData.telefono,
		};
	}

	return (
		<SafeAreaView style={styles.mainView}>
			<View style={styles.headerContainer}>
				<HeaderView props={props} />
			</View>
			<View style={styles.imageContainer}>
				<MainImage />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Perfil</Text>
			</View>
			<View style={styles.inputContainer}>
			<View >
				<Text style={styles.inputTitle}>Editar Datos</Text>
			</View>
				<Input
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					placeholder="Nombre(s)"
					placeholderTextColor="#969696"
					defaultValue={userFbData.nombre}
					onChange={(e) => setNombre(e.nativeEvent.text)}
					rightIcon={
						<Icon
							type="Fontawesome5"
							name="edit"
							iconStyle={styles.iconRight}
						/>
					}
					errorMessage={formError.nombre ? "Este campo es obligatorio." : null}
				/>
				<Input
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					placeholder="Apellido(s)"
					placeholderTextColor="#969696"
					defaultValue={userFbData.apellido}
					onChange={(e) => setApellido(e.nativeEvent.text)}
					rightIcon={
						<Icon
							type="Fontawesome5"
							name="edit"
							iconStyle={styles.iconRight}
						/>
					}
					errorMessage={
						formError.apellido ? "Este campo es obligatorio." : null
					}
				/>
				<Input
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					placeholder="Teléfono De Contacto"
					placeholderTextColor="#969696"
					defaultValue={userFbData.telefono}
					keyboardType="number-pad"
					onChange={(e) => setTelefono(e.nativeEvent.text)}
					rightIcon={
						<Icon
							type="Fontawesome5"
							name="edit"
							iconStyle={styles.iconRight}
						/>
					}
					errorMessage={
						formError.telefono ? "Este campo es obligatorio." : null
					}
				/>
			</View>
			<View style={styles.updateContainer}>
				<TouchableOpacity onPress={ActualizarDatos} style={styles.updateButton}>
					<Text style={styles.textUpdate}>Actualizar Datos</Text>
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
	updateContainer: {
		flex: 1,
		height: height * 0.15,
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
	textUpdate: {
		fontSize: 17.5,
		color: "white",
		fontWeight: "bold",
	},
	updateButton: {
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
		marginTop: -115,
		position: "absolute",
	},
});