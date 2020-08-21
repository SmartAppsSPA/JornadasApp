import React from "react";
import {
	View,
	Image,
	Dimensions,
	StyleSheet,
	Text,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");

const DATA = [
	{
		coverImageUri:
			"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPunta%20Arenas%20600x300.png?alt=media&token=86b2047c-8375-4355-a35e-5650efa2c794",
		cornerLabelColor: "#0080ff",
		cornerLabelText: "Centro Punta Arenas",
	},
	{
		coverImageUri:
			"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPorvenir%20600x300.png?alt=media&token=9c7c5b6c-73b9-4167-9370-94212153cc38",
		cornerLabelColor: "#FFD300",
		cornerLabelText: "Centro Porvenir",
	},
	{
		coverImageUri:
			"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/Sources%2FNatales%20600x300.png?alt=media&token=a2571e78-6d68-4a30-89a5-5fc39c690da9",
		cornerLabelColor: "#2ECC40",
		cornerLabelText: "Centro Puerto Natales",
	},
];

export default function CarouselHome() {
	const renderItem = (data) => (
		<View key={data.coverImageUri} style={styles.cardContainer}>
			<View style={styles.cardWrapper}>
				<Image style={styles.card} source={{ uri: data.coverImageUri }} />
				<View
					style={[
						styles.cornerLabel,
						{ backgroundColor: data.cornerLabelColor },
					]}
				>
					<Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Carousel
				pagination={PaginationLight}
				renderItem={renderItem}
				data={DATA}
				loop
				autoplay
				autoplayInterval={5000}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		width: width,
		backgroundColor: "#696969",
		borderBottomEndRadius: 30,
		borderBottomStartRadius: 30,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#34495E",
	},
	cardContainer: {
		alignItems: "center",
		justifyContent: "center",
		width,
	},
	cardWrapper: {
		borderRadius: 8,
		overflow: "hidden",
	},
	card: {
		width: width * 0.99,
		height: 210,
	},
	cornerLabel: {
		position: "absolute",
		top: 1,
		right: 0,
		borderBottomLeftRadius: 8,
	},
	cornerLabelText: {
		fontSize: 12,
		color: "#fff",
		fontWeight: "600",
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 2,
		paddingBottom: 2,
	},
});
