import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import Comment from '../General/Comment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getComments, addComment } from '../../network/App';
const CommentsModal=({navigation, modalVisible, setModalVisible, item, totalComments, setTotalComments})=> {
    const [data, setData]= useState([])
    const [newComment, setNewComment]=useState(null)
    const [commentAdded, setCommentAdded]=useState(false)
  
    useEffect(()=>{
        if(modalVisible){
            getPostComments()
        }
    },[commentAdded, modalVisible])

    const handleComment=()=>{
      if(newComment){
        addNewComment()
        setNewComment(null)
      }
    }
    const getPostComments= async()=>{
      const result = await getComments(item.id)
      if (result.success){
        setData(result.data.data)
      }
    }
    const addNewComment= async()=>{
      const data = {
        post_id: item.id,
        content: newComment
      };
      console.log(data)
      const result = await addComment(data)
      if (result.success){
        setCommentAdded(true)
        setTotalComments(totalComments+1)
        setCommentAdded(false)
      }
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