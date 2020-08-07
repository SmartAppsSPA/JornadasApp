import React from "react";
import { Image, StyleSheet } from "react-native";
import { Header, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


export default function HeaderView() {
	const navigation = useNavigation();
	return (
		<Header
			containerStyle={styles.header}
			statusBarProps={{ barStyle: "light-content" }}
			leftComponent={
				<Icon
					underlayColor="#032555F"
					color="#FFF"
					name="menu"
					onPress={() => navigation.openDrawer()}
				/>
			}
			rightComponent={
				<Image
					source={require("../../../assets/logo_jornadas_leones.png")}
					style={styles.headerImage}
				/>
			}
		/>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#03255F",
		justifyContent: "space-between",
		height: 55,
    paddingBottom: 17.5,
    zIndex: 1000,
	},
	headerImage: {
		width: 150,
		height: 40,
		marginBottom: 5,
	},
});
