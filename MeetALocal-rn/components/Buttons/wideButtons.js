import {  Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import WideButtonStyle from './Styles/WideButtonStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors'
const WideButton=({text, handlePress, icon, color})=>{
    return (
        <TouchableOpacity onPress={handlePress} style={WideButtonStyle.button} > 
            <Icon name={icon} size={25} style={{marginHorizontal:5}} color={color} />
            <Text style={{color:color, fontSize:18, fontWeight:'500'}} >{text}</Text>
        </TouchableOpacity>
    )
}
export default WideButton