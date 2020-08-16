import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";

export default function AlcanciaImage() {
	return (
		<View style={styles.imageContainer}>
			<View style={styles.imageWrapper}>
				<Image
					source={{
						uri:
							"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2Falcancia%20600x300.png?alt=media&token=0f6eb84d-7068-4ad3-9d76-29394c844d00",
					}}
					style={styles.image}
				/>
			</View>
		</View>
	);
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	imageContainer: {
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		width: width,
		height: 200,
		backgroundColor: "#696969",
		borderBottomEndRadius: 30,
		borderBottomStartRadius: 30,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#34495E",
	},
	imageWrapper: {},
	image: {
		width: width,
		height: 200,
	},
});
