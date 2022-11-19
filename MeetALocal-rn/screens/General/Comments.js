import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import Comment from '../../components/General/Comment';
import { getComments, addComment } from '../../network/App';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommentsStyles from './Styles/CommentsStyles';
import { useRoute } from '@react-navigation/native';
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
const PostComments=()=> {
    const route = useRoute();
    const item= route.params.item
    const [data, setData]= useState([])
    const [totalComments, setTotalComments]=useState(item.comments)
    const [newComment, setNewComment]=useState(null)
    const [commentAdded, setCommentAdded]=useState(false)
    
    useEffect(()=>{
        getPostComments()
    },[commentAdded])
    useEffect(()=>{
        setTotalComments(data.length)
    },[data])
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
      }
      const result = await addComment(data)
      if (result.success){
        setCommentAdded(true)
        setTotalComments(totalComments+1)
        setCommentAdded(false)
      }
    }
  return (
        <KeyboardAvoidingView style={CommentsStyles.centeredView}>
            <View style={CommentsStyles.headerContainer}>
                <View style={{flexDirection:"row"}}>
                    <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={CommentsStyles.image} />
                    <View>
                        <Text style={CommentsStyles.userName}>{item.name}</Text>
                        <Text style={CommentsStyles.userCountry}>{item.country}</Text>
                        <Text style={CommentsStyles.details}>{item.details}</Text>
                    </View>
                </View>
            </View>
                <View style={CommentsStyles.center}>
                    <Text style={CommentsStyles.totalComments}>{totalComments} comments</Text>
                <View style={CommentsStyles.separator}/>
            </View>
            <KeyboardAwareScrollView style={CommentsStyles.scrollView}>
                {data.map((comment, index)=><Comment comment={comment} key={index}/>)}
            </KeyboardAwareScrollView>
            <View style={CommentsStyles.addComment}>
            <TextInput placeholder='Add a comment' onChangeText={setNewComment} value={newComment} />
            <Pressable style={CommentsStyles.pressable} onPress={handleComment}>
                <Icon name="send" color={colors.violet} size={20}/>
            </Pressable>
            </View>
        </KeyboardAvoidingView>
     
  )
}
export default PostComments