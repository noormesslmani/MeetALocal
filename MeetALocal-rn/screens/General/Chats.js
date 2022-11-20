import React, { useState, useCallback, useContext } from 'react'
import {ActivityIndicator, ScrollView, View } from 'react-native'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import { colors } from '../../constants/colors';
import MessageCard from '../../components/Cards/MessageCard'
import { useFocusEffect } from '@react-navigation/native';
import ChatScreenStyles from './Styles/ChatScreenStyles';
import EmptyPage from '../../components/General/EmptyPage';
import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { address } from '../../constants/address';
const Chats=({navigation})=> {
  const [chats, setChats]= useState([])
  const { user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(true)
  
  
 
  async function getChats(){
  //query chats
  setChats([])
  setIsLoading(true)
  const q = query(collection(database, "chats"), where("users", "array-contains", user.id), orderBy("last_message.createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    setChats((chats)=>[...chats,{ chat_id: doc.id, user_id:doc.data().users.filter(id=>id!=user.id)[0], date:doc.data().last_message.createdAt.toDate(), text: doc.data().last_message.text }])
    })
    setIsLoading(false)
  }
  
  useFocusEffect(
    useCallback(() => {
      getChats()
    }, []), )
  return (
          <View style={ChatScreenStyles.chatsList}>
          <ScrollView style={{backgroundColor:"white"}}>
          {isLoading && <ActivityIndicator color={colors.violet} style={{marginTop:10}} />}
          {! isLoading &&  chats.map((chat, index)=><MessageCard chat={chat} navigation={navigation} key={index}/>)}
          </ScrollView>
          </View>
        )
}
export default Chats