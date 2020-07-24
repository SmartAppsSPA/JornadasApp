import React, { useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../Utils/Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";
import usePreference from "../Hooks/usePreferences";
import firebase from "../../Firebase/Firebase";
import moment from "moment";

const Donar = (props) => {
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [aporte, setAporte] = useState();

	const submit = () => {
		let errors = [];
		if (!nombre || !apellido || !aporte) {
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!aporte) errors.aporte = true;
		} else {
			const key = firebase.database().ref().push().key;
			firebase
				.database()
				.ref()
				.child(`Users/${userFbData.uid}/aportes/${key}/`)
				.set({
					aporte: aporte,
					nombre: nombre,
					apellido: apellido,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
				});
			firebase
				.database()
				.ref()
				.child(`Donaciones/${key}/`)
				.set({
					aporte: aporte,
					nombre: nombre,
					apellido: apellido,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
				});
			alert("su donacion a sido exitosa");
			handleReset();
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setNombre(userFbData.nombre);
		setApellido(userFbData.apellido);
		setAporte("");
	};

	return (
		<View style={styles.mainView}>
			<HeaderView props={props} />
			<MainImage />
			<ScrollView>
				<View>
					<Text style={styles.titles}>Aporte</Text>
				</View>
				<View style={styles.form}>
					<Text style={styles.form}>Nombre(s)</Text>
					<TextInput
						name="nombre"
						style={[styles.input, formError.nombre && styles.error]}
						textContentType="username"
						placeholder="Ingrese nombre..."
						defaultValue={nombre}
						onChange={(e) => setNombre(e.nativeEvent.text)}
					/>
					<Text style={styles.form}>apellido(s)</Text>
					<TextInput
						name="apellido"
						style={[styles.input, formError.apellido && styles.error]}
						textContentType="middleName"
						placeholder="Ingrese apellido..."
						defaultValue={apellido}
						onChange={(e) => setApellido(e.nativeEvent.text)}
					/>
					<Text style={styles.form}>Aporte</Text>
					<TextInput
						name="aporte"
						style={[styles.input, formError.aporte && styles.error]}
						placeholder="Ingrese Aporte..."
						keyboardType='numeric'
						defaultValue={aporte}
						onChange={(e) => setAporte(e.nativeEvent.text)}
					/>
				</View>
				<View style={styles.buttons}>
					<TouchableHighlight onPress={submit} style={styles.buttonPagar}>
						<Text style={styles.textSubmit}>Donar</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => props.navigation.navigate("Home")}
						style={styles.buttonPagar}
					>
						<Text style={styles.textSubmit}>Volver</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>
		</View>
	);
};

export default Donar;