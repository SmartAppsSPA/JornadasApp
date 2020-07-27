import React, { useState } from "react";
import {
	TextInput,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import firebase from "../../../Firebase/Firebase";
import styles from "./Style";
import { useNavigation } from "@react-navigation/native";
import usePreference from "../../Hooks/usePreferences";

export default function PerfilCompany() {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [rutEmpresa, setRutEmpresa] = useState(userFbData.rutEmpresa);
	const [representante, setRepresentante] = useState(userFbData.representante);
	const [telefono, setTelefono] = useState(userFbData.telefono);
	console.log(userFbData);

	const ActualizarDatos = () => {
		let errors = {};
		if (!nombre || !representante || !telefono || !rutEmpresa) {
			if (!nombre) errors.nombre = true;
			if (!representante) errors.representante = true;
			if (!telefono) errors.telefono = true;
		} else {
			firebase.database().ref().child(`Users/${userFbData.uid}/`).update({
				nombre: nombre,
				representante: representante,
				telefono: telefono,
			});
			alert("Datos actualizados con exito");
			handleReset();
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
		<ScrollView>
			<View style={styles.background}>
				<View>
					<Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
						{"  "}Perfil
					</Text>
					<Text style={{ color: "#fff", fontSize: 20, marginBottom: 10 }}>
						Editar Datos
					</Text>
				</View>
				<TextInput
					style={[styles.input, formError.nombre && styles.error]}
					placeholder="Nombre Empresa"
					placeholderTextColor="#969696"
					defaultValue={userFbData.nombre}
					onChange={(e) => setNombre(e.nativeEvent.text)}
				/>
				<TextInput
					style={[styles.input, formError.rutEmpresa && styles.error]}
					placeholder="RutEmpresa"
					placeholderTextColor="#969696"
					defaultValue={userFbData.rutEmpresa}
					keyboardType="number-pad"
					onChange={(e) => setRutEmpresa(e.nativeEvent.text)}
				/>
				<TextInput
					style={[styles.input, formError.representante && styles.error]}
					placeholder="representante"
					placeholderTextColor="#969696"
					defaultValue={userFbData.representante}
					onChange={(e) => setRepresentante(e.nativeEvent.text)}
				/>
				<TextInput
					style={[styles.input, formError.telefono && styles.error]}
					placeholder="Teléfono De Contacto"
					placeholderTextColor="#969696"
					defaultValue={userFbData.telefono}
					keyboardType="number-pad"
					onChange={(e) => setTelefono(e.nativeEvent.text)}
				/>
				<TouchableOpacity
					onPress={ActualizarDatos}
					style={styles.buttonRegistrarse}
				>
					<Text style={styles.text}>Actualizar Datos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}
					style={styles.buttonLogin}
				>
					<Text style={styles.text}>Volver</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
