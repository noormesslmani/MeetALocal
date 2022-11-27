import { Image } from 'react-native';
import React from 'react';
import LogoStyle from './Styles.js/LogoStyle';

const Logo= ()=> {
    return (
        <Image
        style={LogoStyle.logo}
        source={require('../../assets/logo.png')}/>
    )
  }
  export default Logo