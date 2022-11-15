import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";

import { address } from '../../constants/address';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors';
import { Surface} from 'react-native-paper';
import ScheduleCardStyles from '../ComponentsStyles/ScheduleCardStyles';
import { isAppointmentBooked, isEventBooked } from '../../network/App';
const ScheduleCard=({item})=> {
  console.log(item.start_time.substring(0, 5))
  const [booked, setBooked]=useState(false)
  useEffect(()=>{
    isBooked()
  },[])

  const isBooked=async()=>{
    const result = await isAppointmentBooked(item.id)
    if (result.success){
      console.log(result.data)
      setBooked(result.data.data)
    }
  }
  return (
    <TouchableOpacity style={[ScheduleCardStyles.container, booked? ScheduleCardStyles.booked:null ]} >
      <Text style={[ScheduleCardStyles.date, booked? ScheduleCardStyles.bookedDate: null]}>{item.date}</Text>
      <View style={ScheduleCardStyles.timeContainer}>
        <Text>{item.start_time.substring(0, 5)}</Text>
        <Icon name="long-arrow-right" style={ScheduleCardStyles.arrow} color={colors.violet} />
        <Text>{item.end_time.substring(0, 5)}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default ScheduleCard