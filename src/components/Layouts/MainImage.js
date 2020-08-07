import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";

export default function MainImage(){	
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
					"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2FCentro_Punta_Arenas.jpg?alt=media&token=8371fbff-5a42-4c59-907e-19fc34b7fecd",
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

