import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import styles from "./Style";
import HeaderView from "../components/Layouts/Header";
import MainImage from "../components/Layouts/MainImage";
import usePreference from "../Hooks/usePreferences";

const MisDonaciones = (props) => {
	const { userFbData } = usePreference();
	
	return (
		<View style={styles.mainView}>
			<HeaderView props={props} />
			<MainImage />
			<View>
				<Text style={styles.titles}>Mis Donaciones</Text>
			</View>			
		</View>
	);
};

export default MisDonaciones;
