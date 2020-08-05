import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Layouts/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";
import { validateEmail } from "../../../Utils/validation";
import firebase from "../../../../Firebase/Firebase";

export default function InformacionAlcancia(props) {
	const navigation = useNavigation();
	// hacemos destructurinde  props para obtener los datos de la alcancia seleccionada y el uid del usuario.
	const content = props.route.params.content;
	const uid = props.route.params.uid;
	const key = props.route.params.key;
	//se declaran los useState.
	const [errorForm, setErrorForm] = useState(false);
	const [nombre, setNombre] = useState("");
	const [correo, setCorreo] = useState("");
	const [direccion, setDireccion] = useState("");
	const [telefono, setTelefono] = useState("");
	const [rut, setRut] = useState("");
	const indice_alcancia = content.alcancia_numero - 1;

	const submit = () => {
		let errors = {};
		if (
			!nombre ||
			!direccion ||
			!telefono ||
			content.asignada_tercero === true
		) {
			if (content.asignada_tercero === true)
				alert("esta alcancia ya asido asignada"), console.log("ERROR 0");
			if (!nombre) (errors.nombre = true), console.log("ERROR1");
			if (!direccion) (errors.direccion = true), console.log("ERROR3");
			if (!telefono) (errors.telefono = true), console.log("ERROR4");
		} else {
			firebase
				.database()
				.ref()
				.child(`Users/${uid}/alcancias/${key}/`)
				.update({
					reset: false,
					asignada_tercero: true,
					tercero: {
						nombre: nombre,
						correo: correo,
						direccion: direccion,
						telefono: telefono,
						rut: rut,
					},
				});
			firebase
				.database()
				.ref()
				.child(`Alcancias/${indice_alcancia}/`)
				.update({
					reset: false,
					asignada_tercero: true,
					tercero: {
						nombre: nombre,
						correo: correo,
						direccion: direccion,
						telefono: telefono,
						rut: rut,
					},
				});
			console.log("Exito Al Asignar");
			handleReset();
			navigation.navigate("Alcancias");
		}
		setErrorForm(errors);
	};

	const handleReset = () => {
		setNombre("");
		setCorreo("");
		setDireccion("");
		setTelefono("");
		setRut("");
	};

	if (!content.asignada_tercero) {
		return (
			<View style={styles.container}>
				<Header />
				<ScrollView>
					<Text style={styles.title}>
						Asignar Alcancía: {content.alcancia_numero} {`\n`} codigo:{" "}
						{content.codigo_barra}
					</Text>
					<View style={styles.infoView}>
						<Text style={styles.subTitle}>Formulario entrega de Alcancía</Text>
						<Text style={styles.textKey}>Nombre y Apellido</Text>
						<TextInput
							name="nombre"
							placeholder="Ingrese Nombre y Apellido"
							defaultValue={nombre}
							onChange={(e) => setNombre(e.nativeEvent.text)}
							style={[styles.textInput, errorForm.nombre && styles.error]}
						/>
						<Text style={styles.textKey}>Correo</Text>
						<TextInput
							name="correo"
							placeholder="Ingrese correo electronico de contacto"
							defaultValue={correo}
							onChange={(e) => setCorreo(e.nativeEvent.text)}
							style={[styles.textInput, errorForm.correo && styles.error]}
						/>
						<Text style={styles.textKey}>Dirección</Text>
						<TextInput
							name="direccion"
							placeholder="Ingrese una Dirección"
							defaultValue={direccion}
							onChange={(e) => setDireccion(e.nativeEvent.text)}
							style={[styles.textInput, errorForm.direccion && styles.error]}
						/>
						<Text style={styles.textKey}>Teléfono</Text>
						<TextInput
							name="telefono"
							keyboardType="phone-pad"
							placeholder="+56 9..."
							defaultValue={telefono}
							onChange={(e) => setTelefono(e.nativeEvent.text)}
							style={[styles.textInput, errorForm.telefono && styles.error]}
						/>
						<Text style={styles.textKey}>Rut</Text>
						<TextInput
							name="Rut"
							placeholder="1.111.111-1"
							defaultValue={rut}
							onChange={(e) => setRut(e.nativeEvent.text)}
							style={[styles.textInput, errorForm.rut && styles.error]}
						/>
						<TouchableOpacity onPress={submit} style={styles.submitBtn}>
							<Text style={styles.textBtn}>Asignar</Text>
						</TouchableOpacity>
						<Text style={styles.note}>Todos los campos son obligatorios.</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("Alcancias")}
						style={styles.backButton}
					>
						<Icon
							type="FontAwesome5"
							name="arrow-circle-left"
							size={40}
							color="#03255f"
						/>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	} else {
		return (
			<View>
				<Text>Esta alcancia ya fue asignada</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 10,
	},
	title: {
		flex: 0.5,
		marginVertical: 5,
		marginTop: 10,
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		backgroundColor: "#696969",
	},
	infoView: {
		flex: 8,
		paddingVertical: 10,
		marginVertical: 10,
		backgroundColor: "#fff",
		borderWidth: 0.05,
		borderRadius: 5,
	},
	subTitle: {
		fontSize: 22,
		alignSelf: "center",
		fontWeight: "bold",
		color: "#03255f",
		marginBottom: 30,
	},
	textKey: {
		marginVertical: 8,
		paddingHorizontal: 50,
		marginLeft: 3,
		fontSize: 15,
		fontWeight: "bold",
		color: "#03255f",
	},
	textInput: {
		color: "#696970",
		fontWeight: "bold",
		borderBottomColor: "#696969",
		borderBottomWidth: 1,
		width: 300,
		textAlign: "left",
		alignSelf: "center",
	},
	error: {
		borderBottomColor: "red",
	},
	submitBtn: {
		marginVertical: 30,
		width: 100,
		height: 25,
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: "#03255f",
		borderRadius: 20,
		borderColor: "#696969",
	},
	textBtn: {
		color: "#ffffff",
		fontSize: 15,
		textAlign: "center",
		fontWeight: "bold",
	},
	note: {
		fontWeight: "700",
		textAlign: "center",
		color: "#696969",
		marginVertical: 10,
	},
	backButton: {
		flex: 1,
		alignSelf: "flex-start",
		borderRadius: 25,
		marginLeft: 20,
		marginTop: 15,
		position: "absolute",
	},
});
