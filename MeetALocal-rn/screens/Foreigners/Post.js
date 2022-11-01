import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import PostsStyles from './Styles/PostsStyles';
import PostCardStyles from '../../components/ComponentsStyles/PostCardStyles';
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
import { useRoute } from '@react-navigation/native';
import image from '../../assets/profile.jpg'
import Comment from '../../components/Home/Comment';
const Post=({navigation})=> {
    const [data, setData]= useState({})
    const route = useRoute();
    const item= route.params.item
    useEffect(()=>{
        getComments()
    },[])
    async function getComments(){
        const token = await AsyncStorage.getItem('@token')
        axios({
          method: "get",
          headers: { Authorization: `Bearer ${token}`},
          url:`http://192.168.1.7:8000/api/v1.0.0/users/comments/${item.id}`,
        })
        .then((response)=> {
          setData(response.data)
          return response;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
    const renderItem = ({ item }) => (
    <View>
        <Comment item={item} />
    </View>
    )
  return (
    <View style={PostsStyles.eventContainer}>
        <View style={PostCardStyles.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={image} style={PostCardStyles.image} />
                <View>
                    <Text style={{fontSize:10, marginLeft:10, fontWeight:"600"}}>{item.name}</Text>
                    <Text style={{fontSize:10, marginLeft:10}}>{item.country}</Text>
                </View>
            </View>
        </View>
        <Text style={PostCardStyles.details}>{item.details}</Text>
        <View style={{alignItems:"center"}}>
          <Text style={{fontSize:10, fontWeight:"200", marginBottom:3,marginLeft:10, alignSelf:"flex-start"}}>{item.comments} comments</Text>
          <View style={PostsStyles.separator}/>
        </View>
        <Comment/>
        {/* <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={PostsStyles.list}
            contentContainerStyle={{paddingTop:20, paddingBottom: 300}}
          />
        </SafeAreaView> */}

    </View>
    )
}
 
export default Post