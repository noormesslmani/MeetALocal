import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import Comment from '../General/Comment';
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
                            <Text style={CommentsModalStyles.userName}>{item.name}</Text>
                            <Text style={CommentsModalStyles.userCountry}>{item.country}</Text>
                            <Text style={CommentsModalStyles.details}>{item.details}</Text>
                        </View>
                    </View>
                </View>
                    <View style={CommentsModalStyles.center}>
                        <Text style={CommentsModalStyles.totalComments}>{totalComments} comments</Text>
                    <View style={CommentsModalStyles.separator}/>
                </View>
                <ScrollView style={CommentsModalStyles.scrollView}>
                    {data.map((comment)=><Comment comment={comment}/>)}
                </ScrollView>
                <View style={CommentsModalStyles.addComment}>
                <TextInput placeholder='Add a comment' onChangeText={setNewComment} value={newComment} />
                <Pressable style={CommentsModalStyles.pressable} onPress={handleComment}>
                    <Icon name="send" color="blue" size={20}/>
                </Pressable>
                </View>
            </View>
        </View>
    </Modal>
  )
}
export default CommentsModal