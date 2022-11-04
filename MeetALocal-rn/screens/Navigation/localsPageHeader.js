import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator, createSwitchNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
const LocalsHeader= ()=> {
    const navigation= useNavigation()
    const { user, setUser, locals, setLocals} = useContext(UserContext);
    const handleMap=()=>{
        console.log('map')
        navigation.navigate('locals-map');
    }
    return (
        <View style={styles.headerContainer} >
            <Pressable style={{marginLeft:20}} onPress={() => navigation.goBack()}><Icon name="chevron-back" size={30} color="#8C57BA"/></Pressable>
            <Text style={{fontSize:26, color: "#8C57BA"}}>Locals</Text>
            <View style={{flexDirection:"row"}}>
            <Pressable onPress={handleMap} style={{marginLeft:10}}><Icon name="location-sharp" size={25} color="#8C57BA"/></Pressable> 
            </View>    
        </View>

    )
  }
  export default LocalsHeader