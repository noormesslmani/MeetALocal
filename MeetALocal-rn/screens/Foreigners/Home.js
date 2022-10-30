import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStyles from './Styles/HomeStyles';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from '../../App'
import HomeCard from '../../components/Home/HomeCards';
const ForeignerHome=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const [name, setName]=useState('')
    const [photo, setPhoto]=useState('')
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
          
          console.log(response.data.user)
          setUser(response.data.user)
          setPhoto(response.data.base64)
          return response;
        })
        .catch(function (error) {
          console.warn(error)
        });
    }
  return (
    <View style={HomeStyles.container}>
        <Text style={HomeStyles.welcome}>Welcome</Text>
        <Text style={HomeStyles.name}>{user['name']}</Text>
        <Image source={{uri:`data:image/jpg;base64,${photo}`}} style={HomeStyles.photo }/>
        <HomeCard label={'Locals'}/>
        <HomeCard label={'Events'}/>
        <HomeCard label={'Posts'}/>
    </View>
  )
}
export default ForeignerHome