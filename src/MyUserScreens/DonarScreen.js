import React, { useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";
import usePreference from "../Hooks/usePreferences";
import firebase from "../../Firebase/Firebase";
import moment from "moment";

const Donar = (props) => {
	const { userFbData } = usePreference();
	const [formData, setFormData] = useState(initialValue());
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre)
	const [apellido, setApellido] = useState(userFbData.apellido)
	const [aporte, setAporte] = useState()

	function initialValue() {
		return {
			nombre: "" || userFbData.nombre,
			apellido: "" || userFbData.apellido,
			aporte: ""
		};
	}

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
			handleReset()
		}
		setFormError(errors);
	};

	const handleReset = () => {
		setNombre(userFbData.nombre)
			setApellido(userFbData.apellido)
			setAporte('')
	};




	// console.log(`nombre ${nombre}`);
	// console.log(`apellido ${apellido}`);
	// console.log(`aporte ${aporte}`);
	// console.log(formData.nombre);
	// console.log(formData.apellido);
	// console.log(formData.aporte);

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
						placeholder="Ingrese Texto..."
						defaultValue={nombre}
						onChange={(e) => setNombre(e.nativeEvent.text)}
					/>
					<Text style={styles.form}>apellido(s)</Text>
					<TextInput
						name="apellido"
						style={[styles.input, formError.apellido && styles.error]}
						textContentType="middleName"
						placeholder="Ingrese Texto..."
						defaultValue={apellido}
						onChange={(e) => setApellido(e.nativeEvent.text)}
					/>
					<Text style={styles.form}>Aporte</Text>
					<TextInput
						name="aporte"
						style={[styles.input, formError.aporte && styles.error]}
						placeholder="Ingrese Aporte..."
						keyboardType="numeric"
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


// import React, { useState } from "react";
// import { View, Text, TouchableHighlight, TextInput } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import styles from "./Style";
// import HeaderView from "../components/Layouts/Header";
// import MainImage from "../components/Layouts/MainImage";
// import usePreference from "../Hooks/usePreferences";
// import firebase from "../../Firebase/Firebase";
// import moment from "moment";

// const Donar = (props) => {
// 	const { userFbData } = usePreference();
// 	const [formData, setFormData] = useState(initialValue());
// 	const [formError, setFormError] = useState({});
// 	const [nombre, setNombre] = useState(userFbData.nombre)
// 	const [apellido, setApellido] = useState(userFbData.apellido)
// 	const [aporte, setAporte] = useState('0')

// 	function initialValue() {
// 		return {
// 			nombre: "" || userFbData.nombre,
// 			apellido: "" || userFbData.apellido,
// 			aporte: ""
// 		};
// 	}

// 	const submit = () => {
// 		let errors = [];
// 		if (!formData.nombre || !formData.apellido || !formData.aporte) {
// 			if (!formData.nombre) errors.nombre = true;
// 			if (!formData.apellido) errors.apellido = true;
// 			if (!formData.aporte) errors.aporte = true;
// 		} else {
// 			const key = firebase.database().ref().push().key;
// 			firebase
// 				.database()
// 				.ref()
// 				.child(`Users/${userFbData.uid}/aportes/${key}/`)
// 				.set({
// 					aporte: formData.aporte,
// 					nombre: formData.nombre || nombre,
// 					apellido: formData.apellido || apellido,
// 					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
// 					id: key,
// 					estado_de_pago: "",
// 					forma_de_pago: "",
// 					uid: userFbData.uid,
// 				});
// 			firebase
// 				.database()
// 				.ref()
// 				.child(`Donaciones/${key}/`)
// 				.set({
// 					aporte: formData.aporte,
// 					nombre: formData.nombre || userFbData.nombre,
// 					apellido: formData.apellido || userFbData.apellido,
// 					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
// 					id: key,
// 					estado_de_pago: "",
// 					forma_de_pago: "",
// 					uid: userFbData.uid,
// 				});
// 			alert("su donacion a sido exitosa");
// 			initialValue('');
// 			setFormData("")
// 			setNombre('')
// 			setApellido('')
// 			setAporte('')
// 		}
// 		setFormError(errors);
// 	};

// 	const onChange = (e, type) => {
// 		setFormData({ ...formData, [type]: e.nativeEvent.text });
// 	};




// 	console.log(`nombre ${formError.nombre}`);
// 	console.log(`apellido ${formError.apellido}`);
// 	console.log(`aporte ${formError.aporte}`);
// 	console.log(formData.nombre);
// 	console.log(formData.apellido);
// 	console.log(formData.aporte);

// 	return (
// 		<View style={styles.mainView}>
// 			<HeaderView props={props} />
// 			<MainImage />
// 			<ScrollView>
// 				<View>
// 					<Text style={styles.titles}>Aporte</Text>
// 				</View>
// 				<View style={styles.form}>
// 					<Text style={styles.form}>Nombre(s)</Text>
// 					<TextInput
// 						name="nombre"
// 						style={[styles.input, formError.nombre && styles.error]}
// 						textContentType="username"
// 						placeholder="Ingrese Texto..."
// 						defaultValue={nombre}
// 						onChange={(e) => onChange(e, "nombre")}
// 					/>
// 					<Text style={styles.form}>apellido(s)</Text>
// 					<TextInput
// 						name="apellido"
// 						style={[styles.input, formError.apellido && styles.error]}
// 						textContentType="middleName"
// 						placeholder="Ingrese Texto..."
// 						defaultValue={apellido}
// 						onChange={(e) => onChange(e, "apellido")}
// 					/>
// 					<Text style={styles.form}>Aporte</Text>
// 					<TextInput
// 						name="aporte"
// 						style={[styles.input, formError.aporte && styles.error]}
// 						placeholder="Ingrese Aporte..."
// 						keyboardType="numeric"
// 						defaultValue={aporte}
// 						onChange={(e) => onChange(e, "aporte")}
// 					/>
// 				</View>
// 				<View style={styles.buttons}>
// 					<TouchableHighlight onPress={submit} style={styles.buttonPagar}>
// 						<Text style={styles.textSubmit}>Donar</Text>
// 					</TouchableHighlight>
// 					<TouchableHighlight
// 						onPress={() => props.navigation.navigate("Home")}
// 						style={styles.buttonPagar}
// 					>
// 						<Text style={styles.textSubmit}>Volver</Text>
// 					</TouchableHighlight>
// 				</View>
// 			</ScrollView>
// 		</View>
// 	);
// };

// export default Donar;