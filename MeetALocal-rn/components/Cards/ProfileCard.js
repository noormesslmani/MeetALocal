import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontAwesome5 } from '@expo/vector-icons';
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import ProfileCardStyle from './Styles/ProfileCardStyle';
const ProfileCard=({icon, data, type=1})=> {



  return (<>
            <View style={ProfileCardStyle.card}>
                <Icon name={icon} size={20} color={colors.mediumViolet} />
                {icon=='language'? data.map((language)=><Text style={ProfileCardStyle.arr}>{language}</Text>):
                <Text style={[ProfileCardStyle.data, icon==null? ProfileCardStyle.about:null]}>{data}</Text>}
            </View>
    </>
  )
}
export default ProfileCard