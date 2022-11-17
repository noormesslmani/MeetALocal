import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { address } from '../../constants/address';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors';
import { Surface} from 'react-native-paper';
import ScheduleCardStyles from '../ComponentsStyles/ScheduleCardStyles';
import { isAppointmentBooked, isEventBooked, toggleBookAppointment } from '../../network/App';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const ScheduleCard=({item, type, setDeleted})=> {

  const [booked, setBooked]=useState(false)
  const [isLoading, setIsLoading]=useState(false)
  useEffect(()=>{
    type==1 && isBooked()
  },[])
console.log(type)
  const isBooked=async()=>{
    const result = await isAppointmentBooked(item.id)
    if (result.success){
      setBooked(result.data.data)
    }
  }
  
  const hanldeUnbook=async()=>{
    const data={
      appointment_id:item.appointment_id
    }
    const result=await toggleBookAppointment(data)
    if (result.success){
      setDeleted(true)
    }
  }
  console.log('hi')
  return (
    <View style={[ScheduleCardStyles.container, booked? ScheduleCardStyles.booked:null, type==2 && ScheduleCardStyles.longerContainer ]} >
      {type==2 && 
      <View style={ScheduleCardStyles.localContainer}>
      <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={{width:40, height:40, borderRadius:20, marginHorizontal:3}} /> 
      <Text style={ScheduleCardStyles.name}>{item.name}</Text>
      </View>
      }
      <Text style={ScheduleCardStyles.dateTime}>Date and time:</Text>
      <Text style={[ScheduleCardStyles.date, booked? ScheduleCardStyles.bookedDate: null]}>{item.date}</Text>
      <View style={ScheduleCardStyles.timeContainer}>
        <Text>{item.start_time.substring(0, 5)}</Text>
        <Icon name="long-arrow-right" style={ScheduleCardStyles.arrow} color={colors.violet} />
        <Text>{item.end_time.substring(0, 5)}</Text>
      </View>
      {type==2 && <Pressable onPress={hanldeUnbook} style={ScheduleCardStyles.trash} ><Icon name='trash' size={25} color='grey' /></Pressable> }
    </View>
  )
}
export default ScheduleCard