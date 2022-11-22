import React from 'react'
import Slider from '@react-native-community/slider';
import { colors } from '../../constants/colors';
import SliderStyle from './Styles/SliderStyle';
const FeesSlider=({setFees})=>{
    return(
        <Slider
            step={1}
            style={SliderStyle.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={colors.lightViolet}
            thumbTintColor={colors.violet}
            onValueChange={setFees}
        />
    )

}
export default FeesSlider