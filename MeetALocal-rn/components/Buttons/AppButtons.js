import {  Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import AppButtonStyle from './Styles/AppButtonStyle'
const AppButton=({text, handlePress})=>{
    return (
        <TouchableOpacity style={[AppButtonStyle.button, text=='Cancel'?{backgroundColor:"#D3D3D3"}:null]} onPress={handlePress}>
        <Text style={AppButtonStyle.text}>{text}</Text>
        </TouchableOpacity>
    )
}
export default AppButton
