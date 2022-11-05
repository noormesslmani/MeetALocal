import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../App'
import { database } from "../../firebase";

import MessageCard from '../../components/Home/MessageCard';
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

  const getMessages = async () => {
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
    console.log(users)
  },[])

  useEffect(()=>{
    setUsers(messages.map(message=>({user: message.users.filter(id=>id!=user.id)[0], id: message._id})))
  },[messages])
 
  return (
            <ScrollView>
              {users.map((user)=><MessageCard user={user}/>)}
            </ScrollView>
          
  )
}
export default Chats