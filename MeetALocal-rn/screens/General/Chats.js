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
const Chats=({navigation})=> {
  const [chats, setChats]= useState([])
  const { user, setUser} = useContext(UserContext);
 
  const uri=`http://192.168.1.7:8000/${user.profile_picture}`

  useEffect(()=>{
    setChats([])
    getChats()
  },[])
 
  async function getChats(){
  const q = query(collection(database, "chats"), where("users", "array-contains", user.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    const q = query(collection(database, `chats/${doc.id}/messages`), orderBy("createdAt", "desc"), limit(1))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc2) => {
        setChats((chats)=>[...chats,{ chat_id: doc.id, user_id:doc.data().users.filter(id=>id!=user.id)[0], date:doc2.data().createdAt.toDate(), text: doc2.data().text }])
      })

    })
  }
  return (
            <ScrollView>
              {chats.map((chat)=><MessageCard chat={chat} navigation={navigation} key={chat.chat_id}/>)}
            </ScrollView>
          
  )
}
export default Chats