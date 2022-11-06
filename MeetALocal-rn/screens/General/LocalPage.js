import { View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import LocalProfileStyles from './Styles/LocalProfileStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const LocalPage=({navigation})=> {
    const route = useRoute();
    const { user, setUser} = useContext(UserContext);
    const [isFavorite, SetIsFavorite]=useState(false)
    const item =route.params.item
    useEffect(()=>{
      checkFavorite()
    },[])
    const handleLike=()=>{
      console.log('like')
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
  return (
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
        <View style={LocalProfileStyles.mainContainer}>
          <View style={LocalProfileStyles.imageContainer}>
            <Image source={user.profile_picture?{ uri:`http://192.168.1.7:8000/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalProfileStyles.image}/>
            <View style={{margin:15}}>
              <Text style={{fontSize:18, fontWeight:"600", marginBottom:3}}>{item.name}</Text>
              <Text style={{fontSize:14, fontWeight:"400", marginBottom:3}}>{item.country}</Text>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Text style={{fontSize:13, fontWeight:"400", marginRight:3}}>{item.likes}</Text>
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
                {user.languages.map((language)=><Text style={{fontSize:13, fontWeight:"400", marginLeft:10}}>{language}</Text>)}
              </View>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              {user.type_id==2 && <Pressable style={{marginRight:10}} onPress={handleLike}>{isFavorite?<Icon name="heart" size={20} color="#8C57BA" />:<Icon name="heart-o" size={20} color="#8C57BA" />}</Pressable>}
              <Pressable style={LocalProfileStyles.message}><Text style={{color:"white"}}>Message</Text></Pressable>
            </View>
          </View>
        </View>
    </ScrollView>
    
  )
}
export default LocalPage