import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import EventModal from '../Modals/EventModal';
import { address } from '../../constants/address';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors';
import EventCardStyle from './Styles/EventCardStyle';
const EventCard=({navigation, item, choice, setEventDeleted, setEventBooked})=> {
  const [modalVisible, setModalVisible]=useState(false)
  const [deleted, setDeleted]=useState(false)
  const [booked, setBooked]=useState(false)
   const handleEvent=()=>{
    console.log('pressed')
    setModalVisible(true)
   }
   useEffect(()=>{
    if(deleted){
      setEventDeleted(true)
      setDeleted(false)
    }
    if(booked){
      setEventBooked(true)
      setBooked(false)
    }
   },[deleted, booked])
  console.log(choice) 
  return (
    <>
    <TouchableOpacity style={EventCardStyle.cardContainer} onPress={handleEvent}>
        <Image source={item.photo?{ uri:`${address}/${item.photo}`}: require('../../assets/blank-profile.webp')} style={EventCardStyle.image}/>
        <Text style={EventCardStyle.title}>{item.title}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={EventCardStyle.info}>{item.date}</Text>
            {choice!=3 && <Text style={EventCardStyle.info}>{item.fees} $</Text>}
            {choice==3 && 
            <View style={EventCardStyle.savesContainer}>
              <Text style={EventCardStyle.saves}>{item.saves}</Text> 
              <Icon name='star' size={13} color={colors.gold} /> 
            </View>  }
            
        </View>
    </TouchableOpacity>
    <EventModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={item} choice={choice} setDeleted={setDeleted} setBooked={setBooked}/>
    </>
  )
}
export default EventCard