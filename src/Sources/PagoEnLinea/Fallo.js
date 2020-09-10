import React, {useState,useEffect} from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Restart } from "fiction-expo-restart";
import * as firebase from 'firebase';

export default (props) => {
	const navigation = useNavigation();
	const [payInfo, setPayInfo] = useState(null);
	const orden_de_compra = props.route.params.orden_de_compra;

	useEffect(() => {
		firebase
		  .database()
		  .ref(`Transbank/orden_${orden_de_compra}`)
		  .on("value", (snapshot) => {
			setPayInfo(snapshot.val());
		  });
	  }, [orden_de_compra]);

	  if(payInfo){
		return (
			<View style={styles.container}>
				<Image
					source={require("../../../assets/logo_jornadas.png")}
					style={{
						height: 100,
						resizeMode: "contain",
						marginBottom: 20,
					}}
				/>
				<Text style={styles.exito}>Su aporte</Text>
				<Text style={styles.exito}>no se ha podido llevar a cabo.</Text>
				<FontAwesome name="times-circle" size={50} color="red" />
				<Text style={styles.exito}>Cod error: {payInfo.transbank_data.cod_respuesta}</Text>
				<Text style={styles.exito}>Por favor intenta nuevamente, gracias.</Text>
				<TouchableHighlight onPress={() => Restart()} style={styles.button}>
					<Text style={styles.textButton}>Volver al Inicio</Text>
				</TouchableHighlight>
				<Text style={styles.smartApps}>©2020 Powered by Smartapps</Text>
			</View>
		);
	  }else{
		return (
			<View style={styles.container}>
				<Image
					source={require("../../../assets/logo_jornadas.png")}
					style={{
						height: 100,
						resizeMode: "contain",
						marginBottom: 20,
					}}
				/>
				<Text style={styles.exito}>Su aporte</Text>
				<Text style={styles.exito}>no se ha podido llevar a cabo.</Text>
				<FontAwesome name="times-circle" size={50} color="red" />
				<Text style={styles.exito}>Por favor intenta nuevamente, gracias.</Text>
				<TouchableHighlight onPress={() => Restart()} style={styles.button}>
					<Text style={styles.textButton}>Volver al Inicio</Text>
				</TouchableHighlight>
				<Text style={styles.smartApps}>©2020 Powered by Smartapps</Text>
			</View>
		);
	  }
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#03255F",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: 200,
		height: 50,
		backgroundColor: "#F5C300",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 1,
	},
	textButton: {
		fontSize: 20,
		color: "#03255F",
		fontWeight: "bold",
	},
	exito: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
	},
	smartApps: {
		fontSize: 10,
		color: "white",
		fontWeight: "bold",
	},
});
