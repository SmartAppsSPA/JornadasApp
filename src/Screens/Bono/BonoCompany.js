import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
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
import { Input, Icon, CheckBox } from "react-native-elements";
import BonoImage from "../../components/Layouts/BonoImage";
import Loading from "../../Utils/Loading";

export default function BonoUser(props) {
	const { toastRef } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [cantidad, setCantidad] = useState(1);
	const [email, setEmail] = useState(userFbData.email);
	const [telefono, setTelefono] = useState(userFbData.telefono);
	const [representante, setRepresentante] = useState(userFbData.representante);
	const [checked, setChecked] = useState(false);
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
		if (!email || !telefono || !representante || !cantidad) {
			toastRef.current.show("Todos Los Campos Son Obligatorios.");
			if (!email) errors.email = true;
			if (!telefono) errors.telefono = true;
			if (!representante) errors.representante = true;
			if (!cantidad) errors.cantidad = true;
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
					cantidad: cantidad,
					total: numberFormat(precioTotal),
					nombre: userFbData.nombre,
					rutEmpresa: userFbData.rutEmpresa,
					email: email,
					telefono: telefono,
					representante: representante,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
					certificado: checked,
				})
				.then((response) => {
					setLoading(false);
					toastRef.current.show("Su compra ha sido exitosa.");
					handleReset();
				})
				.catch((err) => {
					toastRef.current.show("Ha ocurrido un problema.");
				});
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setEmail(userFbData.email);
		setTelefono(userFbData.telefono);
		setRepresentante(userFbData.representante);
		setCantidad(1);
		setChecked(false);
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
					<Text style={styles.inputTitle}>Correo Electrónico </Text>
					<Input
						name="email"
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="ejemplo@empresa.com..."
						defaultValue={email}
						onChange={(e) => setEmail(e.nativeEvent.text)}
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
					/>
					<Text style={styles.inputTitle}>Teléfono de Contacto</Text>
					<Input
						name="telefono"
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						placeholder="+56 9 1111 1111..."
						defaultValue={telefono}
						keyboardType="phone-pad"
						keyboardAppearance="dark"
						onChange={(e) => setTelefono(e.nativeEvent.text)}
						rightIcon={
							formError.telefono ? (
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
					/>
					<Text style={styles.inputTitle}>Nombre De Contacto</Text>
					<Input
						name="representante"
						containerStyle={styles.input}
						inputStyle={styles.inputText}
						inputContainerStyle={styles.inputUnderContainer}
						textContentType="nickname"
						placeholder="fran.. zun..."
						defaultValue={representante}
						onChange={(e) => setRepresentante(e.nativeEvent.text)}
						rightIcon={
							formError.representante ? (
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
					/>
					<CheckBox
						center
						title="Solicitar Comprobante. "
						onPress={() => setChecked(!checked)}
						checked={checked}
					/>
				</View>
				<TouchableOpacity
					onPress={() => handleReset()}
					style={styles.buttonFormReset}
				><Text style={styles.formReset}>Reiniciar Formulario</Text>
				</TouchableOpacity>
				<View style={styles.quantityContainer}>
					<Text style={styles.title}>Cantidad</Text>
					<View style={styles.quantity}>
					<TouchableOpacity onPress={() => handleCantidad(cantidad - 1)}>
							<Icon
								type="material-community"
								name="minus-circle"
								color="white"
								size={35}
							/>
						</TouchableOpacity>
						<Text style={styles.numero}>{cantidad}</Text>
						<TouchableOpacity onPress={() => handleCantidad(cantidad + 1)}>
							<Icon
								type="material-community"
								name="plus-circle"
								color="white"
								size={35}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => setCantidad(1)}
						style={styles.buttonReset}
					>
					<Text style={styles.textReset}>Reiniciar</Text>
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
		backgroundColor: "grey",
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
		height: 45,
		fontSize: 45,
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: -15,
		justifyContent: "center",
	},
	buttonReset: {
		width:150,
		height: 25,
		marginBottom: 10,
		backgroundColor: "#03255F",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		borderRadius: 30,
	},
	textReset: {
		fontSize: 15,
		color: "#FFF",
		fontWeight: "bold",
		marginTop: -3,
	},
	buttonFormReset: {
		flexDirection: 'row',
		width: 150,
		height: 25,
		marginVertical: 10,
		backgroundColor: "#03255F",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	formReset: {
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
		backgroundColor: "green",
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
