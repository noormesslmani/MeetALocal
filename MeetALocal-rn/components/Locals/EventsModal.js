import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import EventsModalStyles from '../ComponentsStyles/EventsModalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
const EventsModal=({navigation, modalVisible, setModalVisible})=> {
 const[title, setTtitle]=useState(null)
 const [date, setDate]=useState(new Date());
 const [time, setTime]=useState(0);
 const [datePicker, setDatePicker]=useState(false)
 const [timePicker, setTimePicker]=useState(false)
 const handleDate= (event, value)=>{
    setDatePicker(false)
    setDate(value)
  }
  const handleTime=()=>{}
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={EventsModalStyles.centeredView}>
            <View style={EventsModalStyles.modalView}>
                <Text style={EventsModalStyles.title}>Create New Event</Text>
                <View style={EventsModalStyles.container}>
                    <View style={EventsModalStyles.uploadBtnContainer}>
                        <TouchableOpacity  style={EventsModalStyles.uploadBtn} >
                            <Text style={EventsModalStyles.image}> Image</Text>
                            <AntDesign name="camera" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={EventsModalStyles.contentContainer}>
                    <Text>Title *</Text>
                    <TextInput placeholder='Event title' style={EventsModalStyles.input} value={title} onChangeText={setTtitle}></TextInput>
                </View>
                <View style={EventsModalStyles.contentContainer}>
                <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginTop:10}}><Icon name="calendar" size={30}/></TouchableOpacity>
                    { datePicker && <DateTimePicker
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={handleDate}
                    minimumDate={new Date()}
                    />}
                <TouchableOpacity onPress={()=>setTimePicker(true)} style={{alignSelf:'center', marginTop:10}}><Icon name="clock-o" size={30}/></TouchableOpacity>
                { timePicker && <DateTimePicker
                    value={time}
                    mode={'time'}
                    is24Hour={true}
                    onChange={handleTime}
                    />}
                </View>
            </View>
        </View>
    </Modal>
  )
}
export default EventsModal