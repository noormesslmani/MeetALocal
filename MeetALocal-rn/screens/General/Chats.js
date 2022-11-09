import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import MessageCard from '../../components/Cards/MessageCard'
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
  doc,
  getDocs,
  limit
} from "firebase/firestore";
import { address } from '../../constants/address';
const Chats=({navigation})=> {
  const [chats, setChats]= useState([])
  const [messages, setMessages]= useState([])
  const { user, setUser} = useContext(UserContext);
  const uri=`${address}/${user.profile_picture}`

  useEffect(()=>{
    getChats()
  },[])
 
  async function getChats(){
  //query chats
  setChats([])
  const q = query(collection(database, "chats"), where("users", "array-contains", user.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    //query last message
  
    const q = query(collection(database, `chats/${doc.id}/messages`), orderBy("createdAt", "desc"), limit(1))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc2) => {
      setChats((chats)=>[...chats,{ chat_id: doc.id, user_id:doc.data().users.filter(id=>id!=user.id)[0], date:doc2.data().createdAt.toDate(), text: doc2.data().text }])
      })
    })
  }
  useEffect(()=>{
    setMessages(chats)
  },[chats])
  return (
            <ScrollView>
              {messages.map((chat)=><MessageCard chat={chat} navigation={navigation} key={chat.chat_id}/>)}
            </ScrollView>
          
  )
}
export default Chats