import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import usePreference from "../../Hooks/usePreferences";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { validateEmail } from "../../Utils/validation";
import { useNavigation } from "@react-navigation/native";
import firebase from '../../../Firebase/Firebase';
import moment from 'moment';

export default function BonoUser(props) {
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
			console.log(cantidad);
		} else if (cantidad < 0) {
			cantidad = 1;
			setCantidad(cantidad);
			console.log(cantidad);
		} else if (cantidad >= max) {
			cantidad = max;
			setCantidad(cantidad);
			console.log(cantidad);
		}
	};

	const comprar = () => {
		let errors = {};
		if (!nombre || !apellido || !email) {
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!validateEmail(email)) errors.email = true;
		} else {
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
					telefono: telefono,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
				});
			alert("su Compra a sido exitosa");
			handleReset();
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
			<SafeAreaView style={styles.mainView}>
				<HeaderView props={props} />
				<ScrollView>
					<MainImage />
					<View></View>
					<View style={styles.textBoxBono}>
						<Text style={styles.titles}>Bono Sorteo Parcela</Text>
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
						<Text style={styles.form}>Email</Text>
						<TextInput
							name="email"
							textContentType="emailAddress"
							style={[styles.input, formError.email && styles.error]}
							placeholder="Ingrese email de contacto..."
							defaultValue={email}
							onChange={(e) => setEmail(e.nativeEvent.text)}
						/>
					</View>
					<View style={styles.textBoxCantidad}>
						<Text style={styles.cantidadText}>Cantidad</Text>
					</View>
					<View style={styles.quantity}>
						<TouchableOpacity
							onPress={() => handleCantidad(cantidad - 1)}
							style={styles.buttonLess}
						>
							<Text style={styles.signo}>-</Text>
						</TouchableOpacity>
						<Text style={styles.numero}>{cantidad}</Text>
						<TouchableOpacity
							onPress={() => handleCantidad(cantidad + 1)}
							style={styles.buttonPlus}
						>
							<Text style={styles.signo}>+</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.reset}>
						<TouchableOpacity
							onPress={() => handleReset(cantidad)}
							style={styles.buttonReset}
						>
							<Text style={styles.textReset}>Borrar</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttons}>
						<TouchableOpacity onPress={comprar} style={styles.buttonPagar}>
							<Text style={styles.bonoSubmit}>
								{numberFormat(precioTotal)} Comprar
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Home")}
							style={styles.buttonPagar}
						>
							<Text style={styles.bonoSubmit}>Volver</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
