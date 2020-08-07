import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";

export default function BonoImage() {
	
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
					"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2FBonoRifa%20600x300.png?alt=media&token=63bd664e-f42f-4805-bf91-3d2ef6fa2609",
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
		alignSelf:'center',
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: width ,
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
