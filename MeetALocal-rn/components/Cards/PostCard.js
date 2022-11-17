import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import PostCardStyle from './Styles/PostCardStyle';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'


const PostCard=({navigation, item})=> {
    const [totalComments, setTotalComments]=useState(item.comments)
    const handlePost=()=>{
     navigation.navigate('comments',{item})
}
  return (<>
    <TouchableOpacity style={PostCardStyle.card} onPress={handlePost}>
        <View style={PostCardStyle.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={image} style={PostCardStyle.image} />
                <View>
                    <Text style={{fontSize:10, marginLeft:10, fontWeight:"600"}}>{item.name}</Text>
                    <Text style={{fontSize:10, marginLeft:10}}>{item.country}</Text>
                    <Text style={PostCardStyle.postDetails}>{item.details}</Text>
                </View>
            </View>
        </View>
        <View style={PostCardStyle.commentsContainer}>
            <Text style={PostCardStyle.comments}>{totalComments}</Text>
            <Icon name="comment-o" color="rgba(140, 87, 186, 0.34)" size={15} /> 
        </View>
    </TouchableOpacity>
    </>
  )
}
export default PostCard