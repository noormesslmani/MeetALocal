import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventCardStyles from '../ComponentsStyles/EventCardStyles';
import EventModal from '../Modals/EventModal';
import { address } from '../../constants/address';
const EventCard=({navigation, item, choice, setEventDeleted})=> {
  const [modalVisible, setModalVisible]=useState(false)
  const [deleted, setDeleted]=useState(false)
   const handleEvent=()=>{
    console.log('pressed')
    setModalVisible(true)
   }
   useEffect(()=>{
    if(deleted){
      setEventDeleted(true)
      setDeleted(false)
    }
   },[deleted])
  return (
    <>
    <TouchableOpacity style={EventCardStyles.cardContainer} onPress={handleEvent}>
        <Image source={item.photo?{ uri:`${address}/${item.photo}`}: require('../../assets/blank-profile.webp')} style={EventCardStyles.image}/>
        <Text style={EventCardStyles.title}>{item.title}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={EventCardStyles.info}>{item.date}</Text>
            <Text style={EventCardStyles.info}>{item.fees} $</Text>
        </View>
    </TouchableOpacity>
    <EventModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={item} choice={choice} setDeleted={setDeleted}/>
    </>
  )
}
export default EventCard