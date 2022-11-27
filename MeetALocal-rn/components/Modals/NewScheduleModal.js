import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import React from 'react';
import { useState, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/colors';
import DatePicker from '../General/datePicker';
import TimePicker from '../General/TimePicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../Buttons/AppButtons';
import { addSchedule } from '../../network/App';
import ScheduleModalStyle from './Styles/NewScheduleModalStyle';
import { UserContext } from '../../App';
const ScheduleModal=({setModalVisible, modalVisible, setScheduleAdded, navigation })=> {
    const { user, setUser} = useContext(UserContext);
    //shcedule data
    const [date, setDate]=useState(new Date());
    const [startTime, setStartTime]= useState(new Date() );
    const [endTime, setEndTime]= useState(new Date() );

    //pickers
    const [startTimePicker, setStartTimePicker]= useState(false);
    const [endTimePicker, setEndTimePicker]= useState(false);
    const [datePicker, setDatePicker]= useState(false);

    const [isLoading, setIsloading]=useState(false);
    //setting date
    const handleDate=(event, value)=>{
        setDatePicker(false);
        if(event.type == "set") {
            setDate(value);
        }   
    }
    //setting times
    const handleStartTime=(event, value)=>{
        setStartTimePicker(false);
        if(event.type == "set") {
            setStartTime(value);
        }   
    }
    const handleEndTime=(event, value)=>{
        setEndTimePicker(false);
        if(event.type == "set") {
            setEndTime(value);
        }   
    }
    //submitting
    const handleSubmit=async ()=>{
        if(endTime>startTime){
        setIsloading(true)
        const data={
            date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            start_time:`${startTime.getHours()}:${startTime.getMinutes()}`,
            end_time:`${endTime.getHours()}:${endTime.getMinutes()}`,
            latitude: user.latitude,
            longitude: user.longitude
        }
        const result = await addSchedule(data);
        if (result.success){
            setModalVisible(false);
            setScheduleAdded(true);
        }
        }
        setIsloading(false);
    }

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={ScheduleModalStyle.centeredView}>
        <View style={ScheduleModalStyle.modalView}>
        
            <Text style={ScheduleModalStyle.modalTitle}>Add an appointment</Text> 
            <View style={{flexDirection:"row", alignItems:"flex-start"}}>

            <View style={ScheduleModalStyle.dateContainer}>
            <Text style={ScheduleModalStyle.title}>Date</Text>
            <TouchableOpacity onPress={()=>setDatePicker(true)}>
                <Icon name="calendar" size={30} color={colors.mediumViolet}/></TouchableOpacity>
                <Text style={ScheduleModalStyle.text}>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</Text>
            </View>
            
            <View style={ScheduleModalStyle.dateContainer}>
            <Text style={ScheduleModalStyle.title}>Start</Text>
            <TouchableOpacity onPress={()=>setStartTimePicker(true)}>
                <AntDesign name="clockcircleo" size={30} color={colors.mediumViolet}/></TouchableOpacity>
                <Text style={ScheduleModalStyle.text}>{startTime.getHours()}:{startTime.getMinutes()}</Text>
            </View>
            
            <View style={ScheduleModalStyle.dateContainer}>
            <Text style={ScheduleModalStyle.title}>End</Text>
            <TouchableOpacity onPress={()=>setEndTimePicker(true)}><AntDesign name="clockcircleo" size={30} color={colors.mediumViolet}/></TouchableOpacity>
            <Text style={ScheduleModalStyle.text}>{endTime.getHours()}:{endTime.getMinutes()}</Text>
            </View>
            
            </View>
            {datePicker && <DatePicker date={date} handleDate={handleDate} type={2} />}
            {startTimePicker && <TimePicker time={startTime} handleTime={handleStartTime}/> }
            {endTimePicker && <TimePicker time={endTime} handleTime={handleEndTime}/> }
            {isLoading && <ActivityIndicator color={colors.violet} /> }
            <View style={ScheduleModalStyle.ButtonContianer}>
                <AppButton text={'Submit'} handlePress={handleSubmit} />
                <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)} />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default ScheduleModal