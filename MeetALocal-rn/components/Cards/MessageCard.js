import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useState, useEffect} from "react";
import { getUserDetails } from '../../network/App';
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import MessageCardStyle from './Styles/MessageCardStyle';
const MessageCard=({navigation, chat})=> {
    const [image, setImage]=useState(null);
    const [name, setName]=useState(null);
    const [type_id, setType_id]=useState(null);

    //get messaged users info
    useEffect(()=>{
        getUser();
    },[])

    const getUser=async()=>{
        const result = await getUserDetails(chat.user_id);
        if (result.success){
            setName(result.data.data.name);
            setImage(result.data.data.profile_picture);
            setType_id(result.data.data.type_id);
        }
    } 
    //navigate to chat screen
    const handleChat=()=>{
        const chatId=chat.chat_id;
        navigation.navigate('chat-screen', {chatId, userId:null, image, name});
    }

  return (
    <View style={MessageCardStyle.container}>
        <TouchableOpacity style={MessageCardStyle.messageContainer} onPress={handleChat}>
            <View style={MessageCardStyle.messageSubContainer}>
                <Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={MessageCardStyle.avatar}/>
                <View>
                <Text style={{marginTop:10}}>{name}<Text style={{color:"grey", fontSize:9}}>,  {chat.date.getDate()}-{chat.date.getMonth()}-{chat.date.getFullYear()}</Text></Text>
                {type_id==1?<Text style={{color:"#8C57BA", fontSize:12}}>local</Text>:null}
                <Text style={MessageCardStyle.text}>{chat.text}  </Text>
                </View>
            </View>
            <View>
                <Ionicons name='arrow-forward' size={20} color={colors.lightViolet} />
                
            </View>
        </TouchableOpacity>
        <View style={MessageCardStyle.separator}></View>
    </View>
  )
}
export default MessageCard