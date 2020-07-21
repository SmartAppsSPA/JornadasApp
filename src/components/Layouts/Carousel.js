import React from "react";
import {
	View,
	Image,
	ScrollView,
	Dimensions,
	Text,
	StyleSheet,
} from "react-native";
import Carousel from "react-native-carousel";

const CarouselHome = () => {
	const { width } = Dimensions.get("window");
	const height = width * 0.5; // 60%

	const style = StyleSheet.create({
		container: { width, height },
		scroll: { width, height },
		image: { width, height, resizeMode: "cover" },
		pagination: {
			flexDirection: "row",
			position: "absolute",
			alignSelf: "center",
		},
		pagingText: { fontSize: width / 30, color: "#888", margin: 3 },
		pagingActiveText: { fontSize: width / 30, color: "#fff", margin: 3 },
	});

	const images = [
		"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPunta%20Arenas%20600x300.png?alt=media&token=86b2047c-8375-4355-a35e-5650efa2c794",
		"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPorvenir%20600x300.png?alt=media&token=9c7c5b6c-73b9-4167-9370-94212153cc38",
		"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FNatales%20600x300.png?alt=media&token=c99f6c90-b212-47e4-8bb8-22292549c1b8",
	];

	return (
		<View style={style.container}>
			<Carousel
				animate={true}
				delay={5000}
				loop={true}
				hideIndicators={false}
				indicatorSize={20}
				indicatorColor="#ffffff"
				inactiveIndicatorColor="#999999"
				indicatorSpace={15}
				indicatorOffset={10}
				inactiveIndicatorText="•"
				indicatorText="•"
				indicatorAtBottom={true}
			>
				{images.map((image, index) => (
					<Image key={index} source={{ uri: image }} style={style.image} />
				))}
			</Carousel>
		</View>
	);
};

export default CarouselHome;
