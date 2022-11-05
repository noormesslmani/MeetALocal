import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  addDoc,
  where,
  doc
} from "firebase/firestore";
const Chats=()=> {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { user, setUser} = useContext(UserContext);
  const uri=`http://192.168.1.7:8000/${user.profile_picture}`

  const getMessages = () => {
    // const docRef = doc(database, "chats", 'VUpRFeTQEifkIOwH1rkE');
    // const colRef = collection(docRef, "messages");
    const q = query(collection(database, "chats"), where("users", "array-contains", user.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          users: doc.data().users
        }))
      );
    });
    return () => {
        unsubscribe(); 
    };
};
  useEffect(()=>{
    getMessages()
    console.log(messages)
    setUsers(messages.map(message=>message.users.filter(id=>id!=user.id)[0]))
    console.log(users)
    // getUsers()
  },[])
  
  return (
            <ScrollView>
              {messages.map((message)=><Text>{message.users.filter(id=>id!=user.id)}</Text>)}
            </ScrollView>
  )
}
export default Chats