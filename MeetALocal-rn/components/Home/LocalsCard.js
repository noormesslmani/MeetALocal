import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalCardStyles from '../ComponentsStyles/LocalCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
const LocalCard=({navigation, item})=> {
    const [icons, setIcons]=useState([])
    console.log(item.categories)
  return (
    
    <TouchableOpacity style={LocalCardStyles.card}>
        <Image source={require('../../assets/profile.jpg')} style={LocalCardStyles.image}/>
        <View style={LocalCardStyles.infoContainer}>
            <Text style={LocalCardStyles.name}>{item.name}</Text>
            <Text style={LocalCardStyles.country}>{item.country}</Text>
            <Text style={LocalCardStyles.likes}>Likes</Text>
        </View>
        <View style={LocalCardStyles.fees}>
                <Text style={{fontSize:12, fontWeight:"900"}}>{item.fees}$/hr</Text>
        </View>
        <View style={LocalCardStyles.categoryContainer}>
            <View style={{alignItems:"center"}}>
                <Image source={tourism} style={{width:35, height:35}} />
            </View>
        </View>
    </TouchableOpacity>
  )
}
export default LocalCard