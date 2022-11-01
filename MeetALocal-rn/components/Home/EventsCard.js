import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import EventCardStyles from '../ComponentsStyles/EventCardStyles';
import image from '../../assets/Baalbeck.jpg'
const EventCard=({navigation, item})=> {
   
  return (
    
    <TouchableOpacity style={EventCardStyles.cardContainer}>
        <Image source={image} style={EventCardStyles.image}/>
        <Text style={EventCardStyles.title}>{item.title}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={EventCardStyles.info}>{item.date}</Text>
            <Text style={EventCardStyles.info}>{item.fees}$</Text>
        </View>
    </TouchableOpacity>
  )
}
export default EventCard