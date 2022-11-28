import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import React from 'react';
import { useState, useContext } from "react";
import PostCardStyle from './Styles/PostCardStyle';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import { EventsContext } from '../../context/EventsContext';
import { deletePost } from '../../network/App';
const PostCard=({navigation, item, viewOwn})=> {
    const {posts, setPosts}=useContext(EventsContext);
    const [totalComments, setTotalComments]=useState(item.comments);
    const handlePost=()=>{
     navigation.navigate('comments',{item});
    }
    const handleTrash=async()=>{
        const result=await deletePost({id:item.id});
        if(result.success){
            setPosts(posts.filter(post=>post!=item));
        }
    }
  return (<>
    <TouchableOpacity style={PostCardStyle.card} onPress={handlePost}>
        <View style={PostCardStyle.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={PostCardStyle.image} />
                <View>
                    <View style={PostCardStyle.userInfo}>
                        <View>
                        <Text style={PostCardStyle.name}>{item.name}</Text>
                        <Text style={PostCardStyle.country}>{item.country}</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Text style={PostCardStyle.date}>{item.created_at.substring(0,10)}</Text>
                        {viewOwn && <Pressable onPress={handleTrash}><Icon name='trash' size={20} color='grey' /></Pressable>}
                        </View>
                    </View>
                    <Text style={PostCardStyle.postDetails}>{item.details}</Text>
                </View>
            </View>
        </View>
        <View style={PostCardStyle.commentsContainer}>
            <Text style={PostCardStyle.comments}>{totalComments}</Text>
            <Icon name="comment-o" color={colors.violet} size={15} /> 
        </View>
    </TouchableOpacity>
    </>
  )
}
export default PostCard