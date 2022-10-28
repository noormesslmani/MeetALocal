import { Pressable, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './ComponentsStyles/ButtonStyles'
export default function AuthButton({title}) {
  const handleSubmit=()=>{
    setSubmit(true)
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text>{title}</Text>
    </TouchableOpacity>

  )
}