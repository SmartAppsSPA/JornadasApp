import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";

export default function BonoImage() {
	return (
		<View style={styles.imageContainer}>
			<View style={styles.imageWrapper}>
				<Image
					source={{
						uri:
							"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2FBono_Sorteo_600x300.png?alt=media&token=b56c1b69-eede-40ed-b75b-65a1c4bdfaf0",
					}}
					style={styles.image}
				/>
			</View>
		</View>
	);
}
const { width } = Dimensions.get("window");

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
		borderWidth: 1,
		borderColor: "#34495E",
		overflow: "hidden",
	},
	image: {
		width: width,
		height: 200,
	},
});
