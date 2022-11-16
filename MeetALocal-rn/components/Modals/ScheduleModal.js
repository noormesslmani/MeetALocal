import { View, Text, TouchableOpacity,TextInput ,Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { UserContext } from '../../App'
import { colors } from '../../constants/colors';
import { Button} from 'react-native-paper';
import DatePicker from '../General/datePicker';
import TimePicker from '../General/TimePicker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ScheduleModalStyles from '../ComponentsStyles/ScheduleModalStyles';
import { Time } from 'react-native-gifted-chat';
import { widths } from '../../constants/dimensions';
import AppButton from '../Buttons/AppButtons';
import { addSchedule } from '../../network/App';
const ScheduleModal=({setModalVisible, modalVisible, setScheduleAdded })=> {
    const [date, setDate]=useState(new Date())
    const [startTime, setStartTime]= useState(new Date() )
    const [endTime, setEndTime]= useState(new Date() )
    const [startTimePicker, setStartTimePicker]= useState(false)
    const [endTimePicker, setEndTimePicker]= useState(false)
    const [datePicker, setDatePicker]= useState(false)
    const [isLoading, setIsloading]=useState(false)
    const handleDate=(event, value)=>{
        setDatePicker(false)
        if(event.type == "set") {
            setDate(value)
        }   
    }
    const handleStartTime=(event, value)=>{
        setStartTimePicker(false)
        if(event.type == "set") {
            setStartTime(value)
        }   
    }
    const handleEndTime=(event, value)=>{
        setEndTimePicker(false)
        if(event.type == "set") {
            console.log(value)
            setEndTime(value)
        }   
    }
    const handleSubmit=async ()=>{
        if(endTime>startTime){
        setIsloading(true)
        const data={
            date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            start_time:`${startTime.getHours()}:${startTime.getMinutes()}`,
            end_time:`${endTime.getHours()}:${endTime.getMinutes()}`,
        }
        console.log(data)
        const result = await addSchedule(data)
        if (result.success){
            console.log(result.data.data)
            setModalVisible(false)
            setScheduleAdded(true)
        }
        }
        setIsloading(false)
    }
    
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={ScheduleModalStyles.centeredView}>
        <View style={ScheduleModalStyles.modalView}>
        
            <Text style={ScheduleModalStyles.modalTitle}>Add an appointment</Text> 
            <View style={{flexDirection:"row", alignItems:"flex-start"}}>
            <View style={ScheduleModalStyles.dateContainer}><Text style={ScheduleModalStyles.text}>Date</Text>
            <TouchableOpacity onPress={()=>setDatePicker(true)}><Icon name="calendar" size={25} color={colors.violet}/></TouchableOpacity></View>
            
            <View style={ScheduleModalStyles.dateContainer}><Text style={ScheduleModalStyles.text}>From</Text>
            <TouchableOpacity onPress={()=>setStartTimePicker(true)}><AntDesign name="clockcircleo" size={25} color={colors.violet}/></TouchableOpacity></View>
            
            <View style={ScheduleModalStyles.dateContainer}><Text style={ScheduleModalStyles.text}>To</Text>
            <TouchableOpacity onPress={()=>setEndTimePicker(true)}><AntDesign name="clockcircleo" size={25} color={colors.violet}/></TouchableOpacity></View>
            </View>
            
            {datePicker && <DatePicker date={date} handleDate={handleDate} type={2} />}
            {startTimePicker && <TimePicker time={startTime} handleTime={handleStartTime}/> }
            {endTimePicker && <TimePicker time={endTime} handleTime={handleEndTime}/> }
            {isLoading && <ActivityIndicator color={colors.violet} /> }
            <View style={ScheduleModalStyles.ButtonContianer}>
                <AppButton text={'Submit'} handlePress={handleSubmit} />
                <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)} />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default ScheduleModal