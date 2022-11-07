import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStyles from '../../screens/General/Styles/HomeStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'
const HomeCard=({label, handlePress})=> {
    const [icon, setIcon]=useState('')
    useEffect(()=>{
        if(label=='Locals'){
            setIcon('user')
        }
        else if(label=='Events'){
            setIcon('calendar')
        }
        else{
            setIcon('comment-alt')
        }
    },[])
  return (
    <View style={HomeStyles.cardContainer}>
        <TouchableOpacity style={[HomeStyles.card]} onPress={handlePress} >
            <View style={HomeStyles.cardItems}>
                <Text style={HomeStyles.label}>{label}</Text>
                <Icon name={icon} size={50} color="white"/>
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default HomeCard