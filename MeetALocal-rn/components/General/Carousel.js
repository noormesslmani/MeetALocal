import Carousel from 'react-native-reanimated-carousel';
import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { widths } from '../../constants/dimensions';
const ImageCarousel=({images})=>{
    return(
        <View style={{ flex: 1, alignSelf:"center" }}>
            <Carousel
                loop
                width={widths.width8}
                height={200}
                autoPlay={true}
                mode="parallax"
                data={images}
                scrollAnimationDuration={6000}
                autoPlayInterval={1000}
                renderItem={({ index }) => (
                    <Image source={images[index]} style={{width:widths.width7, height:200}}/>
                )}
              />
          </View>
    )
}
export default ImageCarousel