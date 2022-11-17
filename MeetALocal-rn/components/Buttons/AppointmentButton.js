import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native'
import React, { useState } from 'react'
import AppointmentButtonStyle from './Styles/AppointmentButtonStyle'
const AppointmentButton=({appointment, setSelected, selected})=>{
    
    return (
        <TouchableOpacity  onPress={()=>setSelected(appointment)} style={[AppointmentButtonStyle.bookBtn, selected==appointment? AppointmentButtonStyle.pressedBtn:null]} > 
                <Text style={AppointmentButtonStyle.date}>{appointment.date} </Text>  
                <Text>{appointment.start_time.substring(0, 5)}:{appointment.end_time.substring(0, 5)}</Text>
        </TouchableOpacity>
    )
}
export default AppointmentButton
