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
import Events from './Events';
import Posts from './Posts';
import Locals from './Locals';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import * as Location from 'expo-location';
import profile from '../../assets/profile.jpg'
const Home=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const [name, setName]=useState('')
    const [photo, setPhoto]=useState('')
    const [source, setSource]=useState()
    
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
    const handleLocals=()=>{
        navigation.navigate('locals')
    }
    const handlePosts=()=>{
        navigation.navigate('posts')
    }
    const handleEvents=()=>{
        navigation.navigate('events')
    }
    
    
  return (
    <View style={HomeStyles.container}>
        <Text style={HomeStyles.welcome}>Welcome</Text>
        <Text style={HomeStyles.name}>{user['name']}</Text>
        <Image source={photo?{ uri:`data:image/jpg;base64,${photo}`}: require('../../assets/blank-profile.webp')} style={HomeStyles.photo }/>
        <HomeCard label={'Locals'} handlePress={handleLocals}/>
        <HomeCard label={'Events'} handlePress={handleEvents}/>
        <HomeCard label={'Posts'} handlePress={handlePosts} />
    </View>
  )
}
export default Home