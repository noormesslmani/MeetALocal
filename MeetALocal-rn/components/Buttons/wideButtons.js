import {  Text, TouchableOpacity, } from 'react-native';
import React from 'react';
import WideButtonStyle from './Styles/WideButtonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const WideButton=({text, handlePress, icon, color})=>{
    //button with icon
    return (
        <TouchableOpacity onPress={handlePress} style={WideButtonStyle.button} > 
            <Icon name={icon} size={25} style={{marginHorizontal:5}} color={color} />
            <Text style={{color:color}} >{text}</Text>
        </TouchableOpacity>
    )
}
export default WideButton