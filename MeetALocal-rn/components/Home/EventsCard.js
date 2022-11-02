import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import EventCardStyles from '../ComponentsStyles/EventCardStyles';
import image from '../../assets/Baalbeck.jpg'
import EventModal from './EventModal';
const EventCard=({navigation, item})=> {
  const [modalVisible, setModalVisible]=useState(false)
   const handleEvent=()=>{
    console.log('pressed')
    setModalVisible(true)
   }
  return (
    <>
    <TouchableOpacity style={EventCardStyles.cardContainer} onPress={handleEvent}>
        <Image source={image} style={EventCardStyles.image}/>
        <Text style={EventCardStyles.title}>{item.title}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={EventCardStyles.info}>{item.date}</Text>
            <Text style={EventCardStyles.info}>{item.fees}$ nnn</Text>
        </View>
    </TouchableOpacity>
    <EventModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={item}/>
    </>
  )
}
export default EventCard