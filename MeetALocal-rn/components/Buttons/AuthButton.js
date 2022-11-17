import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AuthButtonStyle from './Styles/AuthButtonStyle'
export default function AuthButton({title, handleSubmit, type=1}) {
  return (
    <TouchableOpacity style={type==1 ?AuthButtonStyle.button1: AuthButtonStyle.button2} onPress={handleSubmit}>
      <Text>{title}</Text>
    </TouchableOpacity>

  )
}