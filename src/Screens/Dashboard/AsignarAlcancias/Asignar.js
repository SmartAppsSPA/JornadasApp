import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Layouts/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../../../../Firebase/Firebase";
import { Input } from "react-native-elements";
import Loading from "../../../Utils/Loading";
import Toast from "react-native-easy-toast";
import moment from 'moment';

export default function InformacionAlcancia(props) {
	const toastRef = useRef();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const content = props.route.params.content;
	const uid = props.route.params.uid;
	const key = props.route.params.key;
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
			toastRef.current.show("Debe Completar Todos Los campos obligatorios.");
			if (content.asignada_tercero === true)
				alert("esta alcancia ya asido asignada"), console.log("ERROR 0");
			if (!nombre) (errors.nombre = true), console.log("ERROR1");
			if (!direccion) (errors.direccion = true), console.log("ERROR3");
			if (!telefono) (errors.telefono = true), console.log("ERROR4");
		} else {
			setLoading(true);
			firebase
				.database()
				.ref()
				.child(`Users/${uid}/alcancias/${key}/`)
				.update({
					reset: false,
					asignada_tercero: true,
					fecha_asignacion: moment().format("DD-MM-YYYY h:mm:ss a"),
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
					fecha_asignacion: moment().format("DD-MM-YYYY h:mm:ss a"),
					tercero: {
						nombre: nombre,
						correo: correo,
						direccion: direccion,
						telefono: telefono,
						rut: rut,
					},
				})
				.then((response) => {
					setLoading(false);
					toastRef.current.show("Éxito al asignar ");
					handleReset();
					navigation.navigate("Alcancias");
				})
				.catch((err) => {
					setLoading(false);
					toastRef.current.show("Algo anda mal, intenta nuevamente.");
				});
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
			<SafeAreaView style={styles.container}>
				<Header />
				<ScrollView>
					<Text style={styles.title}>
						Asignar Alcancía: {content.alcancia_numero} {`\n`} codigo:{" "}
						{content.codigo_barra}
					</Text>
					<View style={styles.inputContainer}>
						<Text style={styles.subTitle}>Formulario entrega de Alcancía</Text>
						<Text style={styles.textKey}>Nombre y Apellido*</Text>
						<Input
							name="nombre"
							placeholder="Toque para escribir..."
							defaultValue={nombre}
							onChange={(e) => setNombre(e.nativeEvent.text)}
							containerStyle={styles.input}
							inputStyle={styles.inputText}
							inputContainerStyle={styles.inputUnderContainer}						
							rightIcon={errorForm.nombre ?
								<Icon								
								type="FontAwesome5"
								name="exclamation-circle"
								color="red"
							/> : null
							}
						/>
						<Text style={styles.textKey}>Correo electrónico</Text>
						<Input
							name="correo"
							placeholder="Toque para escribir..."
							defaultValue={correo}
							onChange={(e) => setCorreo(e.nativeEvent.text)}
							containerStyle={styles.input}
							inputStyle={styles.inputText}
							inputContainerStyle={styles.inputUnderContainer}
						/>
						<Text style={styles.textKey}>Dirección*</Text>
						<Input
							name="direccion"
							placeholder="Ciudad, Calle #0000..."
							defaultValue={direccion}
							onChange={(e) => setDireccion(e.nativeEvent.text)}
							containerStyle={styles.input}
							inputStyle={styles.inputText}
							inputContainerStyle={styles.inputUnderContainer}
							rightIcon={errorForm.nombre ?
								<Icon								
								type="FontAwesome5"
								name="exclamation-circle"
								color="red"
							/> : null
							}
						/>
						<Text style={styles.textKey}>Teléfono*</Text>
						<Input
							name="telefono"
							keyboardType="phone-pad"
							placeholder="+56 9 1111 1111..."
							defaultValue={telefono}
							onChange={(e) => setTelefono(e.nativeEvent.text)}
							containerStyle={styles.input}
							inputStyle={styles.inputText}
							inputContainerStyle={styles.inputUnderContainer}
							rightIcon={errorForm.nombre ?
								<Icon								
								type="FontAwesome5"
								name="exclamation-circle"
								color="red"
							/> : null
							}
						/>
						<Text style={styles.textKey}>Rut</Text>
						<Input
							name="Rut"
							placeholder="1.111.111-1..."
							defaultValue={rut}
							onChange={(e) => setRut(e.nativeEvent.text)}
							containerStyle={styles.input}
							inputStyle={styles.inputText}
							inputContainerStyle={styles.inputUnderContainer}
						/>
						<TouchableOpacity onPress={submit} style={styles.submitBtn}>
							<Text style={styles.textBtn}>Asignar</Text>
						</TouchableOpacity>
						<Text style={styles.note}> * Campos obligatorios. </Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("Alcancias")}
						style={styles.backButton}
					>
						<Icon
							type="FontAwesome5"
							name="arrow-circle-left"
							size={40}
							color="#FFF"
						/>
					</TouchableOpacity>
				</ScrollView>
				<Loading isVisible={loading} text="Asignando..." />
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
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<Header />
				<ScrollView>
					<Text style={styles.title}>La Alcancía ya fue asignada.</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Alcancias")}
						style={styles.backButton}
					>
						<Icon
							type="FontAwesome5"
							name="arrow-circle-left"
							size={40}
							color="#FFF"
						/>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 10,
	},
	title: {
		flex: 0.5,
		marginVertical: 10,
		marginHorizontal: 10,
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		backgroundColor: "#34495E",
		borderRadius: 15,
		overflow: "hidden",
	},
	inputContainer: {
		flex: 5,
		marginVertical: 10,
		marginHorizontal: 50,
		alignItems: "center",
		borderRadius: 15,
		borderColor: "#FFF",
		borderWidth: 1.5,
		overflow: "hidden",
		backgroundColor: "#D6DBDF",
	},
	subTitle: {
		fontSize: 15,
		alignSelf: "center",
		fontWeight: "bold",
		color: "#03255f",
		marginVertical: 10,
	},
	textKey: {
		marginLeft: 15,
		fontSize: 10,
		fontWeight: "bold",
		color: "#03255f",
		alignSelf: "flex-start",
	},
	input: {
		width: "95%",
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
	submitBtn: {
		marginVertical: 10,
		width: 100,
		height: 25,
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: "#34495E",
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
		fontSize: 10,
		fontWeight: "700",
		textAlign: "center",
		color: "red",
		marginBottom: 10,
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
