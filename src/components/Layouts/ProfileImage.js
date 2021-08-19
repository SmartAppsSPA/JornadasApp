import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";

export default function ProfileImage(){	
	return (
		<View
		  style={styles.imageContainer}
		>
		  <View
			style={styles.imageWrapper}
		  >
			<Image
			source={require("../../../assets/sorteo_app-02.jpg")}
			style={styles.image}
		/>
		  </View>
		</View>
	);
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	  imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: width,
		backgroundColor: '#696969',
		height: 210,
		marginTop: -1,
		borderBottomEndRadius: 30,
		borderBottomStartRadius: 30,
		overflow: 'hidden',
	  },
	  imageWrapper: {
	  },
	  image: {
		width: width,
		height: 210,
	  },
})

