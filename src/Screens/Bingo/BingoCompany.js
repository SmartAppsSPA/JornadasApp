import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, requireNativeComponent} from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import usePreference from "../../Hooks/usePreferences";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { validateEmail} from "../../Utils/validation";
import {useNavigation} from  '@react-navigation/native';

export default function BingoCompany(props){
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [cantidad, setCantidad] = useState(1);
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [email, setEmail] = useState(userFbData.email);
	const [telefono, setTelefono] = useState(userFbData.telefono);
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
		if (!nombre || !apellido || !telefono || !email) {
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (telefono) errors.telefono = true;
			if (!validateEmail(email)) errors.email = true;
		} else {
			alert(`compra de ${cantidad} bonos por ${numberFormat(precioTotal)} `);
			handleReset();
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
			<SafeAreaView style={styles.mainView}>
				<HeaderView props={props} />
				<Image source={{uri: "gs://jornadas2020.appspot.com/Sources/telebingo-01.jpg" }} />
				{/* <ScrollView>
					<MainImage />
					<View style={styles.textBoxBono}>
						<Text style={styles.titles}>Bingo</Text>
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
						<Text style={styles.form}>Telefono</Text>
						<TextInput
							name="telefono"
							textContentType="telephoneNumber"
							style={[styles.input, formError.telefono && styles.error]}
							placeholder="+56 9 ..."
							defaultValue={telefono}
							keyboardType="phone-pad"
							keyboardAppearance="dark"
							onChange={(e) => setTelefono(e.nativeEvent.text)}
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
				</ScrollView> */}
			</SafeAreaView>
		);
	}
};

