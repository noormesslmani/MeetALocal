import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'
const Logo= ()=> {
    return (
        <View style={styles.container} >
            <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}/>
        </View>
    )
  }
  export default Logo