import React from "react";
import { View, Image, Dimensions, StyleSheet, ScrollView, Text } from "react-native";
// import Carousel from "react-native-carousel";

import Carousel, {PaginationLight} from 'react-native-x-carousel' 

const { width } = Dimensions.get('window');

const DATA = [
	{
	  coverImageUri: "https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPunta%20Arenas%20600x300.png?alt=media&token=86b2047c-8375-4355-a35e-5650efa2c794",
	  cornerLabelColor: '#0080ff',
	  cornerLabelText: 'Centro Punta Arenas',
	},
	{
	  coverImageUri: "https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPorvenir%20600x300.png?alt=media&token=9c7c5b6c-73b9-4167-9370-94212153cc38",
	  cornerLabelColor: '#FFD300',
	  cornerLabelText: 'Centro Porvenir',
	},
	{
	  coverImageUri: "https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FNatales%20600x300.png?alt=media&token=59d42038-fd05-4e48-865d-1ac1540d19aa",
	  cornerLabelColor: '#2ECC40',
	  cornerLabelText: 'Centro Puerto Natales',
	},
  ];
  
export default function CarouselHome(){
	const renderItem = data => (
		<View
		  key={data.coverImageUri}
		  style={styles.cardContainer}
		>
		  <View
			style={styles.cardWrapper}
		  >
			<Image
			  style={styles.card}
			  source={{ uri: data.coverImageUri }}
			/>
			<View
			  style={[
				styles.cornerLabel,
				{ backgroundColor: data.cornerLabelColor },
			  ]}
			>
			  <Text style={styles.cornerLabelText}>
				{ data.cornerLabelText }
			  </Text>
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
		  />
		</View>
	  );
	};

	const styles = StyleSheet.create({
		container: {
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
		cardContainer: {
		  alignItems: 'center',
		  justifyContent: 'center',
		  width,
		},
		cardWrapper: {
		  borderRadius: 8,
		  overflow: 'hidden',
		},
		card: {
		  width: width * 0.99,
		  height: 210,
		},
		cornerLabel: {
		  position: 'absolute',
		  top: 1,
		  right: 0,
		  borderBottomLeftRadius: 8,
		},
		cornerLabelText: {
		  fontSize: 12,
		  color: '#fff',
		  fontWeight: '600',
		  paddingLeft: 5,
		  paddingRight: 5,
		  paddingTop: 2,
		  paddingBottom: 2,
		},
	  });

// 	const { width } = Dimensions.get("window");
// 	const height = width * 0.5; // 60%

// 	const style = StyleSheet.create({
// 		container: { width, height },
// 		image: {
// 			resizeMode: 'contain',
// 			height: 220,
// 			marginTop: -15,
// 			zIndex: -2,
// 		},
// 	});

// 	const images = [
// 		"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPunta%20Arenas%20600x300.png?alt=media&token=86b2047c-8375-4355-a35e-5650efa2c794",
// 		"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FPorvenir%20600x300.png?alt=media&token=9c7c5b6c-73b9-4167-9370-94212153cc38",
// 		"https://firebasestorage.googleapis.com/v0/b/jornadas2020.appspot.com/o/CarouselViews%2FNatales%20600x300.png?alt=media&token=c99f6c90-b212-47e4-8bb8-22292549c1b8",			
// 	];

// 	return (
// 		<View style={style.container}>
// 			<Carousel
// 				animate={true}
// 				delay={5000}
// 				loop={true}
// 				hideIndicators={false}
// 				indicatorSize={20}
// 				indicatorColor="#ffffff"
// 				inactiveIndicatorColor="#999999"
// 				indicatorSpace={15}
// 				indicatorOffset={10}
// 				inactiveIndicatorText="•"
// 				indicatorText="•"
// 				indicatorAtBottom={true}
// 				flexDirection='row'
// 			>
// 				{images.map((image, index) => (
// 					<Image key={index} source={{uri :image}} style={style.image} />
// 				))}
// 			</Carousel>
// 		</View>
// 	);
// };


