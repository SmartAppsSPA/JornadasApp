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

export default function PerfilUSer() {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
    const [telefono, setTelefono] = useState(userFbData.telefono);
    console.log(navigation)

	const ActualizarDatos = () => {
		let errors = {};
		if (!nombre || !apellido || !telefono) {
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!telefono) errors.telefono = true;
		} else {
			firebase.database().ref().child(`Users/${userFbData.uid}/`).update({
				nombre: nombre,
				apellido: apellido,
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
			apellido: userFbData.apellido,
			telefono: userFbData.telefono,
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
					placeholder="Nombre(s)"
					placeholderTextColor="#969696"
					defaultValue={userFbData.nombre}
					onChange={(e) => setNombre(e.nativeEvent.text)}
				/>
				<TextInput
					style={[styles.input, formError.apellido && styles.error]}
					placeholder="Apellido(s)"
					placeholderTextColor="#969696"
					defaultValue={userFbData.apellido}
					onChange={(e) => setApellido(e.nativeEvent.text)}
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
