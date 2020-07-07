import React from 'react'
import Carousel from "react-native-anchor-carousel";
import { View, Text } from 'react-native';

const CarouselHome = () => {
    
  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      onClickThumb={onClickThumb}
    >
      <View>
        <Image src="assets/1.jpeg" />
        <Text className="legend">Legend 1</Text>
      </View>
      <View>
        <Image
         src="assets/2.jpeg" />
        <Text className="legend">Legend 2</Text>
      </View>
      <View>
        <Image
         src="assets/3.jpeg" />
        <Text className="legend">Legend 3</Text>
      </View>
    </Carousel>
  );
};
export default CarouselHome;