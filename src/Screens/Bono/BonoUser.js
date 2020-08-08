import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import HeaderView from "../../components/Layouts/Header";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import usePreference from "../../Hooks/usePreferences";
import { validateEmail } from "../../Utils/validation";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../../Firebase/Firebase";
import moment from "moment";
import { Input, Icon } from "react-native-elements";
import BonoImage from "../../components/Layouts/BonoImage";
import Loading from "../../Utils/Loading";

export default function BonoUser(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [cantidad, setCantidad] = useState(1);
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [email, setEmail] = useState(userFbData.email);
	const precio = 500;
	const precioTotal = precio * cantidad;

	const handleCantidad = (cantidad, max) => {
		if (cantidad >= 1) {
			setCantidad(cantidad);
		} else if (cantidad < 0) {
			cantidad = 1;
			setCantidad(cantidad);
		} else if (cantidad >= max) {
			cantidad = max;
			setCantidad(cantidad);
		}
	};

	const comprar = () => {
		let errors = {};
		if (!nombre || !apellido || !email) {
			toastRef.current.show("Todos Los Campos Son Obligatorios.");
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!email) errors.email = true;
		} else if (!validateEmail(email)) {
			toastRef.current.show("Correo electrónico incorrecto.");
			errors.email = true;
		} else {
			setLoading(true);
			const key = firebase.database().ref().push().key;
			firebase
				.database()
				.ref()
				.child(`Users/${userFbData.uid}/bonos/${key}/`)
				.set({
					total: numberFormat(precioTotal),
					nombre: nombre,
					apellido: apellido,
					email: email,
					cantidad: cantidad,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
				})
				.then((response) => {
					setLoading(false);
					toastRef.current.show("Su compra ha sido exitosa.");
					handleReset();
					navigation.navigate("Home");
				})
				.catch((err) => {
					toastRef.current.show("Ha ocurrido un problema.");
				});
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setCantidad(1);
		setNombre(userFbData.nombre);
		setApellido(userFbData.apellido);
		setEmail(userFbData.email);
	};

	if (userFbData) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<HeaderView props={props} />
				</View>
				<View style={styles.imageContainer}>
					<BonoImage />
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Bono Sorteo Parcela</Text>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputTitle}>Nombre(s)</Text>
					<Input
						name="nombre"
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						textContentType="name"
						placeholder="Fran... "
						defaultValue={nombre}
						rightIcon={
							formError.nombre ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="Fontawesome5"
									name="edit"
									iconStyle={styles.iconRight}
								/>
							)
						}
						onChange={(e) => setNombre(e.nativeEvent.text)}
					/>
					<Text style={styles.inputTitle}>apellido(s)</Text>
					<Input
						name="apellido"
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						textContentType="middleName"
						placeholder="Zun... "
						defaultValue={apellido}
						rightIcon={
							formError.apellido ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="font-awesome-5"
									name="edit"
									iconStyle={styles.iconRight}
								/>
							)
						}
						onChange={(e) => setApellido(e.nativeEvent.text)}
					/>
					<Text style={styles.inputTitle}>Correo electrónico</Text>
					<Input
						name="email"
						textContentType="emailAddress"
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="ejemplo@gmail.com"
						defaultValue={email}
						rightIcon={
							formError.email ? (
								<Icon
									type="font-awesome"
									name="exclamation-circle"
									color="red"
								/>
							) : (
								<Icon
									type="Fontawesome5"
									name="edit"
									iconStyle={styles.iconRight}
								/>
							)
						}
						onChange={(e) => setEmail(e.nativeEvent.text)}
					/>
				</View>
				<View style={styles.quantityContainer}>
					<Text style={styles.title}>Cantidad</Text>
					<View style={styles.quantity}>
						<TouchableOpacity onPress={() => handleCantidad(cantidad - 1)}>
							<Icon
								type="material-community"
								name="minus-circle"
								iconStyle={styles.iconRight}
							/>
						</TouchableOpacity>
						<Text style={styles.numero}>{cantidad}</Text>
						<TouchableOpacity onPress={() => handleCantidad(cantidad + 1)}>
							<Icon
								type="material-community"
								name="plus-circle"
								iconStyle={styles.iconRight}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => handleReset(cantidad)}
						style={styles.buttonReset}
					>
						<Text style={styles.textReset}>Borrar</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.submitContainer}>
					<TouchableOpacity onPress={comprar} style={styles.buttonPagar}>
						<Text style={styles.bonoSubmit}>
							{numberFormat(precioTotal)} Comprar
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.backContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={styles.comeBack}
					>
						<Icon
							raised
							name="arrow-left"
							type="font-awesome"
							color="#03255F"
						/>
					</TouchableOpacity>
				</View>
				<Loading isVisible={loading} text="Procesando pago" />
			</SafeAreaView>
		);
	}
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 14,
	},
	headerContainer: {
		flex: 1,
	},
	imageContainer: {
		flex: 3,
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
	quantityContainer: {
		flex: 2,
	},
	submitContainer: {
		flex: 1,
	},
	backContainer: {
		flex: 1,
	},
	bonoImagen: {
		width: width * 0.99,
		height: 200,
		resizeMode: "contain",
		borderRadius: 8,
		alignSelf: "center",
		justifyContent: "center",
		marginTop: 3,
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
	quantity: {
		flexDirection: "row",
		justifyContent: "center",
		margin: 15,
	},
	plus: {
		alignItems: "center",
		justifyContent: "center",
	},
	less: {
		alignItems: "center",
		justifyContent: "center",
	},
	numero: {
		width: 75,
		height: 35,
		fontSize: 30,
		color: "#03255F",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: -5,
		justifyContent: "center",
	},
	buttonReset: {
		width: 60,
		height: 30,
		backgroundColor: "#03255F",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	textReset: {
		fontSize: 15,
		color: "#FFF",
		fontWeight: "bold",
		marginTop: -3,
	},
	bonoSubmit: {
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
		marginTop: -80,
		position: "absolute",
	},
});
