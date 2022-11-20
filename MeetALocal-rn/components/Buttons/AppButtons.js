import {  Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import AppButtonStyle from './Styles/AppButtonStyle'
import { colors } from '../../constants/colors'
const AppButton=({text, handlePress, type=1})=>{
    return (
        <TouchableOpacity style={[AppButtonStyle.button, text=='Cancel'?{backgroundColor:colors.lighterGrey}:null, type==2?{backgroundColor:'white'}:null]} onPress={handlePress}>
        <Text style={[AppButtonStyle.text,type==2?{color:'black'}:null]}>{text}</Text>
        </TouchableOpacity>
    )
}
export default AppButton
