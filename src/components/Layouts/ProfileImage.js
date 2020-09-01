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
			source={{
				uri:
					"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2Fperfil.png?alt=media&token=b19e7276-50d6-44f6-a7d3-cb6a990cc40b",
			}}
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

