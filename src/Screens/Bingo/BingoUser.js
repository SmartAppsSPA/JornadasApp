import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	Image,
	Dimensions,
} from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";
import usePreference from "../../Hooks/usePreferences";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { validateEmail } from "../../Utils/validation";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../../Firebase/Firebase";
import moment from "moment";
import { Icon } from "react-native-elements";

export default function BonoUser(props) {
	const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [cartones, setCartones] = useState(1);
	const [nombre, setNombre] = useState(userFbData.nombre);
	const [apellido, setApellido] = useState(userFbData.apellido);
	const [email, setEmail] = useState(userFbData.email);
	const [telefono, setTelefono] = useState(userFbData.telefono);
	const precio = 500;
	const precioTotal = precio * cartones;

	const handlecartones = (cartones, max) => {
		if (cartones >= 1) {
			setCartones(cartones);
		} else if (cartones < 0) {
			cartones = 1;
			setCartones(cartones);
		} else if (cartones >= max) {
			cartones = max;
			setCartones(cartones);
		}
	};

	const comprar = () => {
		let errors = {};
		if (!nombre || !apellido || !telefono || !email) {
			if (!nombre) errors.nombre = true;
			if (!apellido) errors.apellido = true;
			if (!telefono) errors.telefono = true;
			if (!validateEmail(email)) errors.email = true;
		} else {
			const key = firebase.database().ref().push().key;
			firebase
				.database()
				.ref()
				.child(`Users/${userFbData.uid}/bingos/${key}/`)
				.set({
					total: numberFormat(precioTotal),
					nombre: nombre,
					apellido: apellido,
					email: email,
					cartones: cartones,
					telefono: telefono,
					numero_de_juego: 1,
					ganador: false,
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
		setCartones(1);
		setNombre(userFbData.nombre);
		setApellido(userFbData.apellido);
		setEmail(userFbData.email);
		setTelefono(userFbData.telefono);
	};

	const { width, height } = Dimensions.get("window");

	if (userFbData) {
		return (
			<SafeAreaView style={styles.mainView}>
				<HeaderView props={props} />
				<View
					style={{
						width: width,
						height,
						height: height,
						backgroundColor: "#A9B4C0",
					}}
				>
					<Image
						style={{
							width: width,
							height: height * 0.8,
							borderRadius: 30,
							borderWidth: 1,
							borderColor: "#03255f",
							marginTop: 10,
						}}
						source={{
							uri:
								"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2Ftelebingo%20jpg.jpg?alt=media&token=f6b9100a-63f4-460b-8df5-42f3fca67b6d",
						}}
					/>
					<View style={{ alignSelf: "center" }}>
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
				</View>
				{/* <ScrollView>
					<MainImage />
					<View></View>
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
					<View style={styles.textBoxCartones}>
						<Text style={styles.cartonesText}>cartones</Text>
					</View>
					<View style={styles.quantity}>
						<TouchableOpacity
							onPress={() => handlecartones(cartones - 1)}
							style={styles.buttonLess}
						>
							<Text style={styles.signo}>-</Text>
						</TouchableOpacity>
						<Text style={styles.numero}>{cartones}</Text>
						<TouchableOpacity
							onPress={() => handlecartones(cartones + 1)}
							style={styles.buttonPlus}
						>
							<Text style={styles.signo}>+</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.reset}>
						<TouchableOpacity
							onPress={() => handleReset(cartones)}
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
}
