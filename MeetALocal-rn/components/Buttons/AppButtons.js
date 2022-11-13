import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { widths } from '../../constants/dimensions'
import { colors } from '../../constants/colors'
const AppButton=({text, handlePress})=>{
    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}
export default AppButton
const styles=StyleSheet.create({
    button:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.lightViolet,
        borderRadius: 20,
        padding:10,
        width:0.25*widths.width,
        height:40
    },
    text:{
        fontWeight:"700",
        color:"white"
    }
})