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
import { Input, Icon } from "react-native-elements";
import BonoImage from "../../components/Layouts/BonoImage";
import Loading from "../../Utils/Loading";
import axios from "axios";

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
	const [telefono, setTelefono] = useState(userFbData.telefono);
	const [transbank, setTransbank] = useState(null);
	const [numeroOrden, setNumeroOrden] = useState();
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
		let orderToArray = [];
		let errors = {};
		if (!nombre || !apellido || !email || !telefono) {
			toastRef.current.show("Todos Los Campos Son Obligatorios.");
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!email) errors.email = true;
			if (!telefono) errors.telefono = true;
		} else if (!validateEmail(email)) {
			toastRef.current.show("Correo electrónico incorrecto.");
			errors.email = true;
		} else {
			setLoading(true);
			firebase
				.database()
				.ref("Transbank")
				.orderByChild("numero_orden")
				.limitToLast(1)
				.on("value", (snapshot) => {
					setNumeroOrden(snapshot.val());
				});
			if (numeroOrden) {
				console.log(numeroOrden);
				Object.keys(numeroOrden).forEach((key, i) => {
					orderToArray[i] = numeroOrden[key];
				});
				let key = parseInt(orderToArray[0].numero_orden) + 1;
				console.log(key);
				firebase
					.database()
					.ref()
					.child(`Transbank/orden_${key}`)
					.set({
						item: "Bono",
						Tipo: "Usuario",
						precio: precioTotal,
						nombre: nombre,
						apellido: apellido,
						telefono: telefono,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						numero_orden: key,
						estado_de_pago: "Pendiente",
						forma_de_pago: "",
						uid: userFbData.uid,
					});
				firebase
					.database()
					.ref()
					.child(`Users/${userFbData.uid}/bonos/${key}/`)
					.set({
						total: precioTotal,
						nombre: nombre,
						apellido: apellido,
						email: email,
						telefono: telefono,
						cantidad: cantidad,
						numero_orden: key,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						id: key,
						estado_de_pago: "Pendiente",
						forma_de_pago: "Pendiente",
						uid: userFbData.uid,
					})
					firebase
					.database()
					.ref()
					.child(`Bono_digital/${key}/`)
					.set({
						total: precioTotal,
						nombre: nombre,
						apellido: apellido,
						email: email,
						telefono: telefono,
						cantidad: cantidad,
						numero_orden: key,
						fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
						id: key,
						estado_de_pago: "Pendiente",
						forma_de_pago: "Pendiente",
						uid: userFbData.uid,
					})
					.then((res) => {
						axios({
							method: "post",
							url: "https://appjornadasmagallanicas.cl/api/api/transactions",
							data: {
								orden_compra: key,
								sessionID: userFbData.nombre,
								item: "Bono",
								tipo: "Usuario",
								monto: precioTotal,
								cantidad: cantidad,
								nombre: nombre,
								apellido: apellido,
								email: email,
								telefono: telefono,
							},
						}).then((response) => {
							setTransbank(response.data);
							console.log(transbank);
							navigation.navigate("Pago Aporte", { transbank: response.data });
						});
						handleReset();
						setLoading(false);
					})
					.catch((err) => {
						setLoading(false);
						toastRef.current.show(
							"Ha ocurrido un problema, intente nuevamente."
						);
					});
			} else {
				setLoading(false);
				toastRef.current.show("Ha ocurrido un problema, intente nuevamente.");
			}
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setCantidad(1);
		setNombre(userFbData.nombre);
		setApellido(userFbData.apellido);
		setEmail(userFbData.email);
		setTelefono(userFbData.telefono);
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
						autoCapitalize='none'
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
						autoCapitalize='none'
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
						autoCapitalize='none'
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
					<Text style={styles.inputTitle}>Teléfono de Contacto</Text>
				<Input
					name="telefono"
					containerStyle={styles.input}
					inputStyle={styles.inputText}
					inputContainerStyle={styles.inputUnderContainer}
					autoCapitalize='none'
					placeholder="+56 9 1111 1111..."
					defaultValue={telefono}
					keyboardType="phone-pad"
					keyboardAppearance="dark"
					onChange={(e) => setTelefono(e.nativeEvent.text)}
					rightIcon={
						formError.telefono ? (
							<Icon type="font-awesome" name="exclamation-circle" color="red" />
						) : (
							<Icon
								type="Fontawesome5"
								name="edit"
								iconStyle={styles.iconRight}
							/>
						)
					}
				/>
				</View>
				<TouchableOpacity
					onPress={() => handleReset()}
					style={styles.buttonFormReset}
				>
					<Text style={styles.formReset}>Reiniciar Formulario</Text>
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
								iconStyle={styles.less}
							/>
						</TouchableOpacity>
						<Text style={styles.numero}>{cantidad}</Text>
						<TouchableOpacity onPress={() => handleCantidad(cantidad + 1)} >
							<Icon
								type="material-community"
								name="plus-circle"
								color="white"
								size={35}
								iconStyle={styles.plus}
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

const { width, height } = Dimensions.get("window");

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
		width: width,
		alignItems: "center",
		borderRadius:20,
		borderWidth:1,
		borderColor: '#34495E',
		backgroundColor: "#A9B4C0",
		paddingVertical: 25,
	},
	quantityContainer: {
		flex: 2,
		backgroundColor: "#A9B4C0",
		borderRadius:20,
		borderWidth:1,
		borderColor: '#34495E',
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
		borderRadius: 30,
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
		width: width * 0.75,
		height: height *0.05,
		backgroundColor: "#FFF",
		margin: 8,
		borderRadius: 30,
		borderWidth:1,
		borderColor: '#34495E',
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
		margin: 10,
	},
	plus: {
		alignItems: "center",
		justifyContent: "center",
		color: '#03255f',
	},
	less: {
		alignItems: "center",
		justifyContent: "center",
		color: '#03255f',
	},
	numero: {
		width: 75,
		height: 50,
		fontSize: 35,
		color: "#03255f",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: -10,
		justifyContent: "center",
		borderRadius: 20,
		borderWidth: 1,
		backgroundColor: '#ffffff',
		overflow: 'hidden',
	},
	buttonReset: {
		width: width * 0.50,
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
		flexDirection: "row",
		width: width * 0.50,
		height: 25,
		marginVertical: 10,
		backgroundColor: "#03255F",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	formReset: {
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
		width: width * 0.50,
		height: height * 0.03,
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
		marginTop: -65,
		position: "absolute",
	},
});
