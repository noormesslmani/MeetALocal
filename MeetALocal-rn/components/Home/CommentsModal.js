import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventModalStyles from '../ComponentsStyles/EventModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import Comment from './Comment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const CommentsModal=({navigation, modalVisible, setModalVisible, item, totalComments, setTotalComments})=> {
    const [data, setData]= useState([])
    const [newComment, setNewComment]=useState(null)
    const [commentAdded, setCommentAdded]=useState(false)
    useEffect(()=>{
        if(modalVisible){
            getComments()
        }
    },[commentAdded])

    const handleComment=()=>{
      if(newComment){
        addComment()
        setNewComment(null)
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
        setTotalComments(totalComments+1)
        return response;
      })
      .catch(function (error) {
        console.warn(error)
      });
    }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={CommentsModalStyles.centeredView}>
            <View style={CommentsModalStyles.modalView}>
                <View style={CommentsModalStyles.headerContainer}>
                    <View style={{flexDirection:"row"}}>
                        <Image source={image} style={CommentsModalStyles.image} />
                        <View>
                            <Text style={{fontSize:10, marginLeft:10, fontWeight:"600"}}>{item.name}</Text>
                            <Text style={{fontSize:10, marginLeft:10}}>{item.country}</Text>
                        </View>
                    </View>
                </View>
                <Text style={CommentsModalStyles.details}>{item.details}</Text>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:10, fontWeight:"300", marginBottom:3,marginLeft:10, alignSelf:"flex-start"}}>{totalComments} comments</Text>
                    <View style={CommentsModalStyles.separator}/>
                </View>
                <ScrollView style={{marginBottom:10}}>
                    {data.map((comment)=><Comment comment={comment}/>)}
                </ScrollView>
                <View style={CommentsModalStyles.addComment}>
                <TextInput placeholder='Add a comment' onChangeText={setNewComment} value={newComment} />
                <TouchableOpacity style={{position:"absolute", right:20}} onPress={handleComment}>
                    <Icon name="send" color="blue" size={20}/>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}
export default CommentsModal