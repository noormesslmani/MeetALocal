import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStyles from './Styles/HomeStyles';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from '../../App'
const ForeignerHome=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    
    useEffect(()=>{
        profile()
      },[])
    async function profile(){
        const token = await AsyncStorage.getItem('@token')
        axios({
          method: "get",
          headers: { Authorization: `Bearer ${token}`},
          url:"http://192.168.1.7:8000/api/v1.0.0/auth/user-profile",
        })
        .then((response)=> {
          setUser(response.data)
          console.log(user)
          return response;
        })
        .catch(function (error) {
          console.warn(error)
        });
    }
  return (
    <View style={HomeStyles.container}>
        <Text style={HomeStyles.welcome}>Welcome</Text>
    </View>
  )
}
export default ForeignerHome