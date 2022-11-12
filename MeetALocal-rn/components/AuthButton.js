import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './ComponentsStyles/ButtonStyles'
export default function AuthButton({title, handleSubmit, type=1}) {
  return (
    <TouchableOpacity style={type==1 ?styles.button1: styles.button2} onPress={handleSubmit}>
      <Text>{title}</Text>
    </TouchableOpacity>

  )
}