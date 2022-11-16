import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { UserContext } from '../../App'
import { colors } from '../../constants/colors';
import { Button} from 'react-native-paper';
import AppointmentButton from '../Buttons/AppointmentButton';
import AppointmentsModalStyles from '../ComponentsStyles/AppointmentModalStyles';
import { getAppointments, bookAppointment } from '../../network/App';
import AppButton from '../Buttons/AppButtons';
import styles from '../ComponentsStyles/ButtonStyles';
const AppointmentsModal=({navigation, setModalVisible, modalVisible, id})=> {
  const [appointments, setAppointments]=useState(null)
  const [selected, setSelected]=useState(null)
  const [isloading, setIsLoading]=useState(false)
  useEffect(()=>{
    if(modalVisible){
    getAvailalbeAppointments()
    }
  },[modalVisible])
  const getAvailalbeAppointments=async()=>{
    const result= await getAppointments(id)
    if (result.success){
      setAppointments(result.data.data)
      console.log(result.data.data)
    }
  }
  const handleBook=async()=>{
    if(selected){
      setIsLoading(true)
      const data={
        appointment_id:selected.id
      }
      const result= await bookAppointment(data)
      if (result.success){
        setModalVisible(false)
      }
      setIsLoading(false)
    }
  }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={AppointmentsModalStyles.centeredView}>
        <View style={AppointmentsModalStyles.modalView}>
            <Text style={AppointmentsModalStyles.title}>Pick an appointment</Text>
            <ScrollView  showsVerticalScrollIndicator={false} >
            {appointments && appointments.map((appointment, index)=> <AppointmentButton appointment={appointment} setSelected={setSelected} selected={selected} /> ) }
            </ScrollView>
            {isloading && <ActivityIndicator color={colors.violet} />}
            <View style={AppointmentsModalStyles.btnContainer}>
              <AppButton text={'Book'} handlePress={handleBook} />
              <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)}  />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default AppointmentsModal