import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { getSchedule } from '../../network/App';
const Schedules=()=> {
  const [schedule, setSchedule]=useState(null)
   useEffect(()=>{
    getMySchedule()
   },[])
   const getMySchedule=async()=>{
    const result=await getSchedule()
    if (result.success){
      console.log(result.data.data)
      setSchedule(result.data.data)
    }
  }
  return (
        <View>
            <Text>Appointments</Text>
        </View>
     
  )
}
export default Schedules