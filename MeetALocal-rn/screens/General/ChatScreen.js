import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  addDoc,
  where
} from "firebase/firestore";
import { useRoute } from '@react-navigation/native';
const ChatScreen=()=> {
    const route = useRoute();
    const chadId= route.params.user.id
    const image= route.params.image
    const name= route.params.name
    const type= route.params.type_id
    const [messages, setMessages] = useState([]);
    const { user, setUser} = useContext(UserContext);
    const uri=`http://192.168.1.7:8000/${user.profile_picture}`

  useEffect(() => {
    
  }, []);
  
  return (
    <></>
  )
}
export default ChatScreen
