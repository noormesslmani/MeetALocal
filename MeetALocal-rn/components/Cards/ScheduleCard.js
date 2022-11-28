import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useState, useEffect, useContext } from "react";
import { address } from '../../constants/address';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/colors';
import {toggleBookAppointment, userProfile, deleteAppointment } from '../../network/App';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ScheduleCardStyle from './Styles/ScheduleCardStyle';
import ScheduleModal from '../Modals/ScheduleModal';
import { EvilIcons } from '@expo/vector-icons';
import { BookingsContext } from '../../context/BookingsContext';
const ScheduleCard=({item, type, navigation})=> {
  const [modalVisible, setModalVisible]=useState(false);

  const { bookings, setBookings, schedules,setSchedules} = useContext(BookingsContext);
  //2 variations (one for locals and one for foreigners)
  
  //unbook function for foreigners(type=2)
  const hanldeUnbook=async()=>{
    const result=await toggleBookAppointment({appointment_id:item.appointment_id});
    if (result.success){
      setBookings(bookings.filter(booking=> booking!=item));
    }
  }
 

  //navigate to User profile
  const handleUser=async ()=>{
    const result= await userProfile(item.local_id);
    navigation.navigate('local-page', {item: result.data.data});
  }

  //delete unbooked appointment (for locals)
  const hanldeTrash=async()=>{
    const result= await deleteAppointment(item.id);
    if(result.success){
      setSchedules(schedules.filter(schedule=> schedule!=item));
    }
  }
  return (
    <Pressable style={[ScheduleCardStyle.container, item.booked? ScheduleCardStyle.booked:null, type==2 && ScheduleCardStyle.longerContainer ]} onPress={()=>{type==1 && setModalVisible(true)}} >
      {type==2 && 
      <TouchableOpacity style={ScheduleCardStyle.localContainer} onPress={handleUser} >
        <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={{width:30, height:30, borderRadius:15, marginHorizontal:3}} /> 
        <Text style={ScheduleCardStyle.name}>{item.name.split(' ')[0]}</Text>
      </TouchableOpacity>
      }
      
      <View  style={ScheduleCardStyle.dateTimeContainer}>
        <Text style={ScheduleCardStyle.dateTime}>Date:</Text>
        <Text style={[ScheduleCardStyle.date, item.booked? ScheduleCardStyle.bookedDate: null]}>{item.date}</Text>
      </View>

      <View  style={ScheduleCardStyle.dateTimeContainer}>
        <Text style={ScheduleCardStyle.dateTime}>Time:</Text>
        <View style={ScheduleCardStyle.timeContainer}>
          <Text style={[ScheduleCardStyle.date, item.booked? ScheduleCardStyle.bookedDate: null]}>{item.start_time.substring(0, 5)}</Text>
          <Icon name="long-arrow-right" style={ScheduleCardStyle.arrow} color={colors.violet} />
          <Text style={[ScheduleCardStyle.date, item.booked? ScheduleCardStyle.bookedDate: null]}>{item.end_time.substring(0, 5)}</Text>
        </View>
      </View>

      {type==1 && !item.booked && <Pressable onPress={hanldeTrash} style={ScheduleCardStyle.trash} ><EvilIcons name='close' size={25} color='grey' /></Pressable> }
      {type==2 && <Pressable onPress={hanldeUnbook} style={ScheduleCardStyle.trash} ><EvilIcons name='close' size={25} color='grey' /></Pressable> }
      {type==1 && <ScheduleModal setModalVisible={setModalVisible} modalVisible={modalVisible} item={item} navigation={navigation} />}
    </Pressable>
    
  )
}
export default ScheduleCard