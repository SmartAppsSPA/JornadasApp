import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Layouts/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { numberFormat } from "../../../Sources/PagoEnLinea/FormatPrice";

export default function InformacionAlcancia(props) {
	const navigation = useNavigation();
	const content = props.route.params.content;
	console.log(content);

	if (content) {
		return (
			<View>
				<Header />
				<Text style={styles.infoTitle}>Información Alcancía</Text>
				<View style={styles.infoView}>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Numero De Alcancia:</Text>
						<Text style={styles.textValue}> {content.alcancia_numero}</Text>
					</View>
					{content.asiganda_externo ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada Externo:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada Externo:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					{content.asignada_tercero ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Tercero:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Tercero:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					{content.asignada_usuario ? (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Usuario:</Text>
							<Text style={styles.textValue}> Si</Text>
						</View>
					) : (
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Asignada A Usuario:</Text>
							<Text style={styles.textValue}> No</Text>
						</View>
					)}
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Codigo De Barra:</Text>
						<Text style={styles.textValue}> {content.codigo_barra}</Text>
					</View>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Monto Recaudado:</Text>
						<Text style={styles.textValue}>
							{" "}
							{numberFormat(content.monto_recaudad)}
						</Text>
					</View>
				</View>
				{content.tercero ? (
					<View>
					<Text style={styles.infoTitle}>Información de Tercero</Text>
					<View style={styles.infoView}>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Nombre: </Text>
				<Text style={styles.textValue}>{content.tercero.nombre}</Text>
						</View>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Email: </Text>
							<Text style={styles.textValue}>{content.tercero.correo}</Text>
						</View>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Dirección:</Text>
							<Text style={styles.textValue}>{content.tercero.direccion}</Text>
						</View>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Teléfono:</Text>
							<Text style={styles.textValue}>{content.tercero.telefono}</Text>
						</View>
					</View>
					</View>
				) : null}
				{content.externo ? (
					<View>
					<Text style={styles.infoTitle}>Información de Externo</Text>
					<View style={styles.infoView}>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Nombre: </Text>
				<Text style={styles.textValue}>{content.externo.nombre}</Text>
						</View>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Email: </Text>
							<Text style={styles.textValue}>{content.externo.correo}</Text>
						</View>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Dirección:</Text>
							<Text style={styles.textValue}>{content.externo.direccion}</Text>
						</View>
						<View style={styles.textBox}>
							<Text style={styles.textKey}>Teléfono:</Text>
							<Text style={styles.textValue}>{content.externo.telefono}</Text>
						</View>
					</View>
					</View>
				) : null}
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Icon
						type="FontAwesome5"
						name="arrow-circle-left"
						size={50}
						color="#03255f"
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
		);
	} else {
		return null;
	}
}

const styles = StyleSheet.create({
	infoTitle: {
		marginVertical:10,
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		justifyContent: "center",
		backgroundColor: "#696969",
		height: 30,
	},
	infoView: {
		paddingVertical:10,
		paddingHorizontal: 70,
		marginVertical: 10,
		marginHorizontal: 10,
		backgroundColor: "#fff",
		borderWidth: 0.05,
		borderRadius: 5,
	},
	textBox: {
		flexDirection: "row",
	},
	textKey: {
		flex: 1,
		marginLeft: 3,
		fontSize: 15,
		fontWeight: "bold",
		color: "#03255f",
	},
	textValue: {
		fontSize: 15,
		fontWeight: "700",
		color: "#696969",
	},
	backButton: {
		flexDirection: "row",
		width: 55,
		height: 55,
		alignSelf: "flex-start",
		justifyContent: "center",
		borderRadius: 25,
		marginLeft: 20,
		position: 'absolute',
		marginTop: 145,
	},
	icon: {
		marginTop: 3,
	},
});
