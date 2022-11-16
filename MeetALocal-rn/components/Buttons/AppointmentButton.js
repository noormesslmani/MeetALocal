import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { widths } from '../../constants/dimensions'
import { colors } from '../../constants/colors'
import { Button} from 'react-native-paper';
const AppointmentButton=({appointment})=>{
    const [pressed, setPressed]=useState(false)
    return (
        <Button uppercase={false} onPress={()=>setPressed(!pressed)} labelStyle={{ color: colors.violet, fontSize: 16 }} style={[styles.bookBtn,pressed? styles.pressedBtn:null]}   mode="outlined" > 
                {appointment.date}   {appointment.start_time.substring(0, 5)}: {appointment.end_time.substring(0, 5)}
        </Button>
    )
}
export default AppointmentButton
const styles=StyleSheet.create({
    bookBtn:{
        marginVertical:10,
        width:widths.width7,
        height:55,
        backgroundColor:'white',
        borderColor:colors.violet,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },
    pressedBtn:{
        backgroundColor:colors.lighterViolet, 
    }
})