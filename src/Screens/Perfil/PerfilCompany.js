import React, { useState } from "react";
import {
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import firebase from "../../../Firebase/Firebase";
import { useNavigation } from "@react-navigation/native";
import usePreference from "../../Hooks/usePreferences";
import MainImage from "../../components/Layouts/MainImage";
import HeaderView from "../../components/Layouts/Header";
import Loading from '../../Utils/Loading';

export default function PerfilCompany(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [rutEmpresa, setRutEmpresa] = useState(userFbData.rutEmpresa);
	const [representante, setRepresentante] = useState(userFbData.representante);
	const [telefono, setTelefono] = useState(userFbData.telefono);

	const ActualizarDatos = () => {
		let errors = {};
		if (!nombre || !representante || !telefono || !rutEmpresa) {
			toastRef.current.show("Todos los campos son obligatorios");
			if (!nombre) errors.nombre = true;
			if (!representante) errors.representante = true;
			if (!telefono) errors.telefono = true;
		} else {
			setLoading(true)
			firebase.database().ref().child(`Users/${userFbData.uid}/`).update({
				nombre: nombre,
				representante: representante,
				telefono: telefono,
			})
			.then((response) => {
				setLoading(false);
				toastRef.current.show("Datos actualizados con exito");
				handleReset();
			})
			.catch((err) => {
				setLoading(false);
				toastRef.current.show("Algo anda mal.");
			});
		}
		setFormError(errors);
		console.log(errors);
	};

	function handleReset() {
		return {
			nombre: userFbData.nombre,
			representante: userFbData.representante,
			telefono: userFbData.telefono,
			rutEmpresa: userFbData.rutEmpresa,
		};
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<HeaderView props={props} />
			</View>
			<View style={styles.imageContainer}>
				<MainImage />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Perfil</Text>
			</View>
			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitle}>Editar Datos</Text>
			</View>
			<View style={styles.inputContainer}>
				<Input
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					placeholder="Nombre Empresa"
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
				/>
				<Input
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					placeholder="RutEmpresa"
					placeholderTextColor="#969696"
					defaultValue={userFbData.rutEmpresa}
					keyboardType="number-pad"
					onChange={(e) => setRutEmpresa(e.nativeEvent.text)}
					rightIcon={
						<Icon
							type="Fontawesome5"
							name="edit"
							iconStyle={styles.iconRight}
						/>
					}
				/>
				<Input
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					placeholder="representante"
					placeholderTextColor="#969696"
					defaultValue={userFbData.representante}
					onChange={(e) => setRepresentante(e.nativeEvent.text)}
					rightIcon={
						<Icon
							type="Fontawesome5"
							name="edit"
							iconStyle={styles.iconRight}
						/>
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
				/>
			</View>
			<View style={styles.updateContainer}>
				<TouchableOpacity onPress={ActualizarDatos} style={styles.updateButton}>
					<Text style={styles.textUpdate}>Actualizar Datos</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.comeBackContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}
					style={styles.comeBack}
				>
					<Icon raised name="arrow-left" type="font-awesome" color="#03255F" />
				</TouchableOpacity>
			</View>
			<Loading isVisible={loading} text="Actualizando."/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 17,
	},
	headerContainer: {
		flex: 1,
	},
	imageContainer: {
		flex: 3,
	},
	titleContainer: {
		flex: 1,
		alignItems: "center",
	},
	subTitleContainer: {
		flex: 1,
		alignItems: "center",
	},
	inputContainer: {
		flex: 5,
		marginLeft: 80,
		marginRight: 80,
		alignItems: "center",
	},
	updateContainer: {
		flex: 5,
		marginLeft: 60,
		marginRight: 60,
		alignItems: "center",
	},
	comeBackContainer: {
		flex: 1,
	},
	title: {
		color: "#03255F",
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 15,
	},
	subTitle: {
		marginBottom:10,
		color: "#03255F",
		fontSize: 15,
		fontWeight: "bold",
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
	textUpdate: {
		fontSize: 17.5,
		color: "white",
		fontWeight: "bold",
	},
	updateButton: {
		width: 150,
		height: 40,
		backgroundColor: "green",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		margin: 25,
	},
	comeBack: {
		alignSelf: "flex-start",
		borderRadius: 25,
		marginLeft: 15,
		marginTop: -70,
		position: "absolute",
	},
});
