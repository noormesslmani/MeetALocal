import React from 'react'
import { useState, useEffect, useContext } from "react";
import Slider from '@react-native-community/slider';
import { colors } from '../../constants/colors';
import SliderStyles from '../ComponentsStyles/SliderStyles';
const FeesSlider=({setFees})=>{
    return(
        <Slider
            step={1}
            style={SliderStyles.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={colors.lightViolet}
            thumbTintColor={colors.violet}
            onValueChange={setFees}
        />
    )

}
export default FeesSlider