import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import MessageCardStyles from '../ComponentsStyles/MessageCardStyles';
import { getUserDetails } from '../../network/App';
import { address } from '../../constants/address';
const MessageCard=({navigation, chat})=> {
    const [image, setImage]=useState(null)
    const [name, setName]=useState(null)
    const [type_id, setType_id]=useState(null)
    useEffect(()=>{
        getUser()
        console.log(chat.user_id)
    },[])
    const getUser=async()=>{
        const result = await getUserDetails(chat.user_id)
        if (result.success){
            setName(result.data.data.name)
            setImage(result.data.data.profile_picture)
            setType_id(result.data.data.type_id)
        }
    } 
    const handleChat=()=>{
        const chatId=chat.chat_id
        navigation.navigate('chat-screen', {chatId, userId:null})
    }
  return (
    <View style={MessageCardStyles.container}>
        <TouchableOpacity style={MessageCardStyles.messageContainer} onPress={handleChat}>
            <Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={MessageCardStyles.avatar}/>
            <View>
            <Text style={{marginTop:10}}>{name}</Text>
            {type_id==1?<Text style={{color:"#8C57BA", fontSize:12}}>local</Text>:null}
            <Text style={MessageCardStyles.text}>{chat.text}  </Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default MessageCard