import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AuthButtonStyle from './Styles/AuthButtonStyle'
export default function AuthButton({title, handleSubmit, type=1}) {
  //button used in Auth screens
  return (
    <TouchableOpacity style={type==1 ?AuthButtonStyle.button1: type==2? AuthButtonStyle.button2: AuthButtonStyle.button3} onPress={handleSubmit}>
      <Text style={type==3?{color:"white", fontWeight:"700"}:null} >{title}</Text>
    </TouchableOpacity>

  )
}