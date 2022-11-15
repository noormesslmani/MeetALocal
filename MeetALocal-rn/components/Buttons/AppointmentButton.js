import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { widths } from '../../constants/dimensions'
import { colors } from '../../constants/colors'
import { Button} from 'react-native-paper';
const AppointmentButton=()=>{
    const [pressed, setPressed]=useState(false)
    return (
        <Button uppercase={false} onPress={()=>setPressed(!pressed)} labelStyle={{ color: colors.violet, fontSize: 16 }} style={[styles.bookBtn,pressed? styles.pressedBtn:null]}   mode="outlined" > 
                16/11/22:   15:00-17:00
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