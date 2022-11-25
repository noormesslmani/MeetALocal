import { View, Text, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useRef } from "react";
import { colors } from '../../constants/colors';
import AppointmentButton from '../Buttons/AppointmentButton';
import { getAppointments, toggleBookAppointment } from '../../network/App';
import AppButton from '../Buttons/AppButtons';
import { sendNotification, Notify } from '../../notifications/Notifications';
import AppointmentsModalStyle from './Styles/AppointmentModalStyle';
import { getToken } from '../../network/Notifications';
import { UserContext } from '../../App';

const AppointmentsModal=({navigation, setModalVisible, modalVisible, id, setAppointmentBooked})=> {
  const [appointments, setAppointments]=useState(null)
  const [selected, setSelected]=useState(null)
  const [isloading, setIsLoading]=useState(false)
  const { user, setUser} = useContext(UserContext);

  useEffect(()=>{
    if(modalVisible){
    getAvailalbeAppointments()

    }
  },[modalVisible])

  const getAvailalbeAppointments=async()=>{
    const result= await getAppointments(id)
    if (result.success){
      setAppointments(result.data.data)
    }
  }
  
  const handleBook=async()=>{
    if(selected){
      setIsLoading(true)
      const result= await toggleBookAppointment({appointment_id:selected.id})
      if (result.success){
        setModalVisible(false)
        const result= await getToken(id)
        sendNotification(result.data.token,'Meet A Local',`The appointment on ${selected.date} form ${selected.start_time} till ${selected.end_time} was booked by ${user.name} `)
        setAppointmentBooked(true)
      }
      setIsLoading(false)
    }
  }
  
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={{zIndex:100}}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        
        <View style={AppointmentsModalStyle.centeredView}>
        <View style={AppointmentsModalStyle.modalView}>
            <Text style={AppointmentsModalStyle.title}>Pick an appointment</Text>
            <ScrollView  showsVerticalScrollIndicator={false} >
            {appointments && appointments.map((appointment, index)=> <AppointmentButton key={index} appointment={appointment} setSelected={setSelected} selected={selected} /> ) }
            {appointments && appointments.length==0 && <Text>No available appointments</Text>}
            {! appointments && <Text>Nothing to display</Text>}
            </ScrollView>
            {isloading && <ActivityIndicator color={colors.violet} />}
            <View style={AppointmentsModalStyle.btnContainer}>
              <AppButton text={'Book'} handlePress={handleBook} />
              <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)}  />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default AppointmentsModal