import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import PostsStyles from './Styles/PostsStyles';
import PostCardStyles from '../../components/ComponentsStyles/PostCardStyles';
import { useRoute } from '@react-navigation/native';
import image from '../../assets/profile.jpg'
import Comment from '../../components/Home/Comment';
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Post=({navigation})=> {
    const [data, setData]= useState([])
    const [newComment, setNewComment]=useState(null)
    const [commentAdded, setCommentAdded]=useState(false)
    const route = useRoute();
    const item= route.params.item

    useEffect(()=>{
        getComments()
        console.log(data.length)
    },[commentAdded])
    const handleComment=()=>{
      console.log(newComment)
      if(newComment){
        addComment()
      }
    }
    async function getComments(){
        const token = await AsyncStorage.getItem('@token')
        axios({
          method: "get",
          headers: { Authorization: `Bearer ${token}`},
          url:`http://192.168.1.7:8000/api/v1.0.0/users/comments/${item.id}`,
        })
        .then((response)=> {
          console.log(response.data)
          setData(response.data.data)
          return response;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
    async function addComment(){
      const token = await AsyncStorage.getItem('@token')
      const data = {
        post_id: item.id,
        content: newComment
      };
      axios({
        method: "post",
        data,
        headers: { Authorization: `Bearer ${token}`},
        url:`http://192.168.1.7:8000/api/v1.0.0/users/comment`,
      })
      .then((response)=> {
        setCommentAdded(true)
        return response;
      })
      .catch(function (error) {
        console.warn(error)
      });
    }
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
          <Text style={{fontSize:10, fontWeight:"300", marginBottom:3,marginLeft:10, alignSelf:"flex-start"}}>{item.comments} comments</Text>
          <View style={PostsStyles.separator}/>
        </View>
        <ScrollView style={{marginBottom:150}}>
            {data.map((comment)=><Comment comment={comment}/>)}
        </ScrollView>
        <KeyboardAvoidingView style={PostsStyles.addComment}>
          <TextInput placeholder='Add a comment' onChangeText={setNewComment} value={newComment} />
          <TouchableOpacity style={{position:"absolute", right:20}} onPress={handleComment}>
            <Icon name="send" color="blue" size={20}/>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
    )
}
 
export default Post