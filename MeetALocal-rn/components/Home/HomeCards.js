import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStyles from '../../screens/Foreigners/Styles/HomeStyles';
const HomeCard=({navigation})=> {
    
  return (
    <View style={HomeStyles.cardContainer}>
        <TouchableOpacity style={HomeStyles.card}>

        </TouchableOpacity>
    </View>
  )
}
export default HomeCard