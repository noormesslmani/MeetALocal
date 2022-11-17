import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput,  ActivityIndicator} from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors';
import { bookAppointment, getBookedAppointments } from '../../network/App';
import { useState, useEffect, useContext } from "react";
import WavyBackground from "react-native-wavy-background";
import ScheduleCard from '../../components/Cards/ScheduleCard';
import ScheduleStyles from './Styles/ScheduleScreenStyles';
const Bookings=()=> {

  const [appointments, setAppointments]=useState(null)
  const [isLoading, setIsLoading]=useState(false)
  const [deleted, setDeleted]=useState(false)
  useEffect(()=>{
    getBookings()
  },[])
  useEffect(()=>{
    if(deleted){
      getBookings()
      setDeleted(false)
    }
  },[deleted])
  const getBookings=async()=>{
    setIsLoading(true)
    const result= await getBookedAppointments()
    if (result.success){
      setAppointments(result.data.data)
      console.log(result.data.data)
    }
    setIsLoading(false)
  }
  const renderItem = ({ item, index }) => (
    <ScheduleCard item={item} key={index} type={2} setDeleted={setDeleted} />
  );

  return (
        <View style={{alignItems:"center", padding:40}}>
          <View
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
          }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={30}
            frequency={1}
            offset={70}
            color= {colors.lightViolet}
            top
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={appointments}
          numColumns={2}
          Key={2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={ScheduleStyles.list}
          contentContainerStyle={{ paddingBottom: 300, paddingTop:20, paddingHorizontal:10}}
          ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:null}
          />
        </View>
     
  )
}
export default Bookings