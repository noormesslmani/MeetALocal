import { View, Image } from 'react-native'
import React from 'react'

const Logo= ()=> {
    return (
        <View>
            <Image
            style={{ width: 300, height: 100, alignSelf: "center", }}
            source={require('../../assets/logo.png')}/>
        </View>
    )
  }
  export default Logo