import React from "react";
import { View, Text, ScrollView } from "react-native";
import HeaderView from "../../components/Layouts/Header";
import { useNavigation } from "@react-navigation/native";
import usePreference from "../../Hooks/usePreferences";
import styles from "../../Utils/Style";
import MainImage from "../../components/Layouts/MainImage";
import PerfilUSer from "./PerfilUSer";
import PerfilCompany from './PerfilCompany';

export default function PerfilScreen(props) {
	const navigation = useNavigation();
	const { userFbData } = usePreference();

	if (userFbData) {
		return (
			<View style={styles.mainView}>
				<HeaderView props={props} />
				<MainImage />
				<ScrollView>
					{userFbData.tipo === "User" ? <PerfilUSer /> : <PerfilCompany />}
				</ScrollView>
			</View>
		);
	} else {
		return null;
	}
}
