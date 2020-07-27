import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Layouts/Header";
import firebase from "../../../../Firebase/Firebase";

export default function InformacionAlcancia(props) {
	const navigation = useNavigation();
	const content = props.route.params.content;

	if (content) {
		return (
			<View>
				<Header />
				<Text style={styles.infoTitle}>Informacion Alcancia</Text>
				<View style={styles.infoView}>
					<Text>{`Numero De Alcancia: ${content.alcancia_numero}`}</Text>
					{content.asiganda_externo ? (
						<Text>Asignada Externo: Si </Text>
					) : (
						<Text>Asignada Externo: No </Text>
					)}
					{content.asignada_tercero ? (
						<Text>Asignada Tercero: Si </Text>
					) : (
						<Text>Asignada Tercero: No </Text>
					)}
					{content.asignada_usuario ? (
						<Text>Asignada Usuario: Si </Text>
					) : (
						<Text>Asignada Usuario: No </Text>
					)}
					<Text>{`Codigo De Barra: ${content.codigo_barra}`}</Text>
					<Text>{content.monto_recaudado}</Text>
				</View>
			</View>
		);
	} else {
		return (
			<View>
				<Text>Aun no se le han asignado alcancias.</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	infoTitle: {
		fontWeight: "bold",
		color: "#03255F",
		fontSize: 30,
		textAlign: "center",
	},
	infoView: {
		margin: 10,
		backgroundColor: "#fff",
	},
	textInfo: {},
});
