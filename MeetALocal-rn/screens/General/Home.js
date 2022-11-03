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
import * as Location from 'expo-location';
import profile from '../../assets/profile.jpg'
import IImageConverter from 'react-native-image-converter'

const Home=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
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
        <Image source={user.base64?{ uri:`data:image/jpg;base64,${user.base64}`}: require('../../assets/blank-profile.webp')} style={HomeStyles.photo }/>
        <HomeCard label={'Locals'} handlePress={handleLocals}/>
        <HomeCard label={'Events'} handlePress={handleEvents}/>
        <HomeCard label={'Posts'} handlePress={handlePosts} />
    </View>
  )
}
export default Home