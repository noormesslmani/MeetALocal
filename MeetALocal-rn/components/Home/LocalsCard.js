import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalsStyles from '../../screens/Foreigners/Styles/LocalsPageStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'
const LocalCard=({navigation})=> {
  return (
    <View>
        <Text>Local card</Text>
    </View>
  )
}
export default LocalCard