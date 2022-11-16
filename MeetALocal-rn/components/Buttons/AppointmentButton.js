import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { widths } from '../../constants/dimensions'
import { colors } from '../../constants/colors'
import { Button} from 'react-native-paper';
const AppointmentButton=({appointment, setSelected, selected})=>{
    
    return (
        <TouchableOpacity  onPress={()=>setSelected(appointment)} style={[styles.bookBtn, selected==appointment? styles.pressedBtn:null]} > 
                <Text style={styles.date}>{appointment.date} </Text>  
                <Text>{appointment.start_time.substring(0, 5)}:{appointment.end_time.substring(0, 5)}</Text>
        </TouchableOpacity>
    )
}
export default AppointmentButton
const styles=StyleSheet.create({
    bookBtn:{
        marginVertical:10,
        flexDirection:"row",
        width:widths.width7,
        height:55,
        paddingHorizontal:0.1*widths.width,
        justifyContent:"space-between",
        backgroundColor:'white',
        borderColor:colors.violet,
        borderRadius:10,
        alignItems:"center",
        shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 3
    },
    pressedBtn:{
        backgroundColor:colors.lightViolet, 
    },
    date:{
        fontSize:16,
        fontWeight:"600"
    }
})