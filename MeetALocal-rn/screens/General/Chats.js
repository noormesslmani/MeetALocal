import React, { useState, useCallback, useEffect, useContext } from 'react'
import {ActivityIndicator, ScrollView } from 'react-native'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import { colors } from '../../constants/colors';
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
  const { user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(true)
  const uri=`${address}/${user.profile_picture}`

  useEffect(()=>{
    getChats()
  },[])
 
  async function getChats(){
  //query chats
  setChats([])
  setIsLoading(true)
  const q = query(collection(database, "chats"), where("users", "array-contains", user.id));
  const querySnapshot = await getDocs(q);
  let msg=[]
  querySnapshot.forEach(async (doc) => {
    //query last message
    const q = query(collection(database, `chats/${doc.id}/messages`), orderBy("createdAt", "desc"), limit(1))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc2) => {
      setChats((chats)=>[...chats,{ chat_id: doc.id, user_id:doc.data().users.filter(id=>id!=user.id)[0], date:doc2.data().createdAt.toDate(), text: doc2.data().text }])
      // msg.push({ chat_id: doc.id, user_id:doc.data().users.filter(id=>id!=user.id)[0], date:doc2.data().createdAt.toDate(), text: doc2.data().text })
      })
    // setChats(msg)
    setIsLoading(false)
    })
  }
//   useEffect(() => {
//     setMessages(chats)
//  }, [chats]);
 
  return (
          <ScrollView style={{backgroundColor:"white"}}>
          {isLoading && <ActivityIndicator color={colors.violet} style={{marginTop:10}} />}
          {! isLoading &&  chats.map((chat, index)=><MessageCard chat={chat} navigation={navigation} key={index}/>)}
          </ScrollView>
          
        )
}
export default Chats