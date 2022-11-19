import {  Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import AppButtonStyle from './Styles/AppButtonStyle'
import { colors } from '../../constants/colors'
const AppButton=({text, handlePress, type=1})=>{
    return (
        <TouchableOpacity style={[AppButtonStyle.button, text=='Cancel' || type==2?{backgroundColor:colors.lighterGrey}:null]} onPress={handlePress}>
        <Text style={AppButtonStyle.text}>{text}</Text>
        </TouchableOpacity>
    )
}
export default AppButton
