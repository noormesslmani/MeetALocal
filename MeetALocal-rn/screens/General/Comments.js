import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import Comment from '../../components/General/Comment';
import { getComments, addComment, userProfile } from '../../network/App';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommentsStyles from './Styles/CommentsStyles';
import { useRoute } from '@react-navigation/native';
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import Toast from 'react-native-toast-message';
import { UserContext } from '../../App';
const PostComments=({navigation})=> {
    const route = useRoute();
    const { user, setUser} = useContext(UserContext);
    const item= route.params.item
    const [data, setData]= useState([])
    const [totalComments, setTotalComments]=useState(item.comments)
    const [newComment, setNewComment]=useState(null)
    const [commentAdded, setCommentAdded]=useState(false)
    //get comments on a post
    useEffect(()=>{
        getPostComments()
    },[commentAdded])
    //set total nb of comments
    useEffect(()=>{
        setTotalComments(data.length)
    },[data])
    //add new comment
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
      else{
        Toast.show({
          type: 'error',
          text1: 'Something went wrong'
        });
      }
    }
    const handleUser=async ()=>{
      if(user.id != item.user_id){
      const result= await userProfile(item.user_id)
      item.type_id==1? navigation.navigate('local-page', {item: result.data.data}):navigation.navigate('foreigner-page', {item: result.data.data})
    }
  }
  return (
        <KeyboardAvoidingView style={CommentsStyles.centeredView}>
            <View style={CommentsStyles.headerContainer}>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={handleUser}><Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={CommentsStyles.image} /></TouchableOpacity>
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
                {data.map((comment, index)=><Comment comment={comment} key={index} navigation={navigation} />)}
            </KeyboardAwareScrollView>
            <View style={CommentsStyles.addComment}>
            <TextInput placeholder='Add a comment' onChangeText={setNewComment} value={newComment} />
            <Pressable style={CommentsStyles.pressable} onPress={handleComment}>
                <Icon name="send" color={colors.violet} size={20}/>
            </Pressable>
            </View>
            <Toast/>
        </KeyboardAvoidingView>
     
  )
}
export default PostComments