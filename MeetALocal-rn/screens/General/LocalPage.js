import { View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import LocalProfileStyles from './Styles/LocalProfileStyles';
import { database } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
  doc,
  getDocs,
  limit,
  addDoc
} from "firebase/firestore";
const LocalPage=({navigation})=> {
    const route = useRoute();
    const item =route.params.item
    const { user, setUser} = useContext(UserContext);
    const [isFavorite, SetIsFavorite]=useState(false)
    const [likes, setLikes]= useState(item.likes)
    const [chatId, setChatId]= useState(null)
    useEffect(()=>{
      checkFavorite()
    },[])

    const handleLike=()=>{
      toggleFavorite()
    }
    const handleMessage=()=>{
      getChats()
    }
    async function checkFavorite(){
        const token = await AsyncStorage.getItem('@token')
        axios({
          method: "get",
          headers: { Authorization: `Bearer ${token}`},
          url:`http://192.168.1.7:8000/api/v1.0.0/foreigners/is-favorite/${item.id}`,
        })
        .then(async (response)=> {
          SetIsFavorite(response.data.data)
          return response.data;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
      async function toggleFavorite(){
        const token = await AsyncStorage.getItem('@token')
        const data={
          id:item.id
        }
        axios({
          method: "post",
          data,
          headers: { Authorization: `Bearer ${token}`},
          url:'http://192.168.1.7:8000/api/v1.0.0/foreigners/toggle-favorite',
        })
        .then(async (response)=> {
          console.log(response.data)
          checkFavorite()
          setLikes(response.data.data)
          return response.data;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
      async function getChats(){
        var flag=false
        const q = query(collection(database, "chats"), where("users", "array-contains", user.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          if(doc.data().users.includes(item.id)){
            flag=true
            navigation.navigate('chat-screen', { chat_id: doc.id})
          }
        })
        if(! flag){
        const newChat = await addDoc(collection(database, "chats"), {
          users: [user.id, item.id],
        });
        console.log("ID: ", newChat.id);
        navigation.navigate('chat-screen', { chat_id: newChat.id})
      }
    }
      
  return (
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
        <View style={LocalProfileStyles.mainContainer}>
          <View style={LocalProfileStyles.imageContainer}>
            <Image source={user.profile_picture?{ uri:`http://192.168.1.7:8000/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalProfileStyles.image}/>
            <View style={{margin:15}}>
              <Text style={{fontSize:18, fontWeight:"600", marginBottom:3}}>{item.name}</Text>
              <Text style={{fontSize:14, fontWeight:"400", marginBottom:3}}>{item.country}</Text>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Text style={{fontSize:13, fontWeight:"400", marginRight:3}}>{likes}</Text>
                <Icon name="heart" color="#8C57BA" size={15} /> 
              </View>
            </View>
          </View>
          <View style={LocalProfileStyles.infoContainer}>
            <View>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Icon name="phone" size={20} color="grey" />
                <Text style={{fontSize:13, fontWeight:"400", marginLeft:10}}>{user.phone}</Text>
              </View>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Ionicons name="language" size={20} color="grey" />
                {user.languages.map((language)=><Text style={{fontSize:13, fontWeight:"400", marginLeft:10}} key={language}>{language}</Text>)}
              </View>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              {user.type_id==2 && <Pressable style={{marginRight:10}} onPress={handleLike}>{isFavorite?<Icon name="heart" size={20} color="#8C57BA" />:<Icon name="heart-o" size={20} color="#8C57BA" />}</Pressable>}
              <Pressable style={LocalProfileStyles.message} onPress={handleMessage}><Text style={{color:"white"}}>Message</Text></Pressable>
            </View>
          </View>
        </View>
    </ScrollView>
    
  )
}
export default LocalPage