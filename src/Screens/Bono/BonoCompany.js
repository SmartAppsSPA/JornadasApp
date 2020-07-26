import React, { useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import BonoImage from "../../components/Layouts/BonoImagen";
import usePreference from "../../Hooks/usePreferences";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import {useNavigation} from '@react-navigation/native'
import firebase from "../../../Firebase/Firebase";

export default function BonoCompany(){
	const navigation = useNavigation()
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [cantidad, setCantidad] = useState(1);
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [telefono, setTelefono] = useState();
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
		let errors = [];
		if (!nombre || !apellido || !telefono) {
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!telefono) errors.telefono = true;
		} else {
      alert(`compra de ${cantidad} bonos por ${numberFormat(precioTotal)} `);
      handleReset()
    }
    setFormError(errors);
	};

	const handleReset = () => {
		setCantidad(1);
		setNombre(userFbData.nombre);
		setApellido(userFbData.apellido);
		setTelefono();
	};

	console.log(telefono);

	if (userFbData) {
		return (
			<View style={styles.mainView}>
				<HeaderView props={props} />
				<ScrollView>
					<BonoImage />
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
						<Text style={styles.form}>Telefono</Text>
						<TextInput
							name="telefono"
							textContentType="telephoneNumber"
							style={[styles.input, formError.telefono && styles.error]}
							placeholder="+56 9 ..."
							defaultValue={telefono}
							onChange={(e) => setTelefono(e.nativeEvent.text)}
						/>
					</View>
					<View style={styles.textBoxCantidad}>
						<Text style={styles.cantidadText}>Cantidad</Text>
					</View>
					<View style={styles.quantity}>
						<TouchableHighlight
							onPress={() => handleCantidad(cantidad - 1)}
							style={styles.buttonLess}
						>
							<Text style={styles.signo}>-</Text>
						</TouchableHighlight>
						<Text style={styles.numero}>{cantidad}</Text>
						<TouchableHighlight
							onPress={() => handleCantidad(cantidad + 1)}
							style={styles.buttonPlus}
						>
							<Text style={styles.signo}>+</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.reset}>
						<TouchableHighlight
							onPress={() => handleReset(cantidad)}
							style={styles.buttonReset}
						>
							<Text style={styles.textReset}>Borrar</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.buttons}>
						<TouchableHighlight
							onPress={comprar}
							style={styles.buttonPagar}
						>
							<Text style={styles.bonoSubmit}>
								{numberFormat(precioTotal)} Comprar
							</Text>
						</TouchableHighlight>
						<TouchableOpacity
						onPress={() => navigation.navigate('Home')}
						style={styles.buttonPagar}
						>
							<Text style={styles.bonoSubmit} >Volver</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
};
