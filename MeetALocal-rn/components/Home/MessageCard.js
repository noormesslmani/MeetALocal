import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import MessageCardStyles from '../ComponentsStyles/MessageCardStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const MessageCard=({navigation, user})=> {

    const [image, setImage]=useState(null)
    const [name, setName]=useState(null)
    const [type_id, setType_id]=useState(null)
    useEffect(()=>{
        getUser()
    },[])
    async function getUser(){
    const token = await AsyncStorage.getItem('@token')
    axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}`},
        url:`http://192.168.1.7:8000/api/v1.0.0/users/user/${user.user}`,
    })
    .then((response)=> {
        console.log(response.data)
        setName(response.data.data.name)
        setImage(response.data.data.profile_picture)
        setType_id(response.data.data.type_id)
        return response;
    })
    .catch(function (error) {
        console.warn(error)
    });
    }
    console.log(name)
  return (
    <View style={MessageCardStyles.container}>
        <TouchableOpacity style={MessageCardStyles.messageContainer} onPress={()=>console.log('hi')}>
            <Image source={image?{ uri:`http://192.168.1.7:8000/${image}`}: require('../../assets/blank-profile.webp')} style={MessageCardStyles.avatar}/>
            <View>
            <Text style={{marginTop:10}}>{name}</Text>
            {type_id==1?<Text style={{color:"#8C57BA", fontSize:12}}>local</Text>:null}
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default MessageCard