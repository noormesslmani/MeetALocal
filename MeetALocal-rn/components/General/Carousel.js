
import React from 'react'
import { ImageSlider } from "react-native-image-slider-banner";
const ImagesSlider=({images})=>{
    return(
        <ImageSlider 
        data={images}
        autoPlay={false}
        closeIconColor="#fff"
        />
    )
}
export default ImagesSlider