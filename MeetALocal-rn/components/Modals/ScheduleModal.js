import React from 'react'
import { View, Text, TouchableOpacity, Modal, Image, Pressable } from 'react-native'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors';
import { address } from '../../constants/address';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ScheduleModalStyle from './Styles/ScheduleModalStyle';
import { UserContext } from '../../App'
const ScheduleModal=({setModalVisible, modalVisible, item})=> {
    const { user, setUser} = useContext(UserContext);
    console.log(item.booker)

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
        <Pressable style={{position:"absolute", right:10, top:10}} onPress={()=>setModalVisible(false)} ><Ionicons name='close' size={20} /></Pressable>
        <Text style={ScheduleModalStyle.modalTitle} >Appointment Details</Text>
        <View style={ScheduleModalStyle.detailsContainer}>
            <Icon name='calendar' size={30} color={colors.lightViolet} style={ScheduleModalStyle.icon} />
            <Text style={ScheduleModalStyle.text}>{item.date}</Text>
        </View>
        <View style={ScheduleModalStyle.detailsContainer}>
            <AntDesign name='clockcircleo' size={30} color={colors.lightViolet} style={ScheduleModalStyle.icon}/>
            <Text style={ScheduleModalStyle.text}>{item.start_time} - {item.end_time}</Text>
        </View>
        <View style={ScheduleModalStyle.detailsContainer}>
            <Icon name='user' size={30} color={colors.lightViolet} style={ScheduleModalStyle.icon}/>
            {item.booker.length==0 && <Text style={ScheduleModalStyle.text}>Not Booked Yet</Text>}
            {item.booker.length>0 &&<View style={ScheduleModalStyle.bookerContainer} >
                <Image source={item.booker[0].profile_picture?{ uri:`${address}/${item.booker[0].profile_picture}`}: require('../../assets/blank-profile.webp')} style={ScheduleModalStyle.profileImage} />
                <Text style={ScheduleModalStyle.text}>{item.booker[0].name}</Text>
            </View> }
        </View>
        
        </View>
      </View>
    </Modal>
  )
}
export default ScheduleModal