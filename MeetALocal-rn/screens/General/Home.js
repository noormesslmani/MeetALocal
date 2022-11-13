import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStyles from './Styles/HomeStyles';
import { UserContext } from '../../App'
import HomeCard from '../../components/Cards/HomeCard';
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
        <Image source={user.profile_picture?{ uri:`http://192.168.1.7:8000/${user.profile_picture}`}: require('../../assets/blank-profile.webp')} style={HomeStyles.photo }/>
        <HomeCard label={'Locals'} handlePress={handleLocals}/>
        <HomeCard label={'Events'} handlePress={handleEvents}/>
        <HomeCard label={'Posts'} handlePress={handlePosts} />
    </View>
  )
}
export default Home