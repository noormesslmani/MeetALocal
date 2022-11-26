import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import PostCardStyle from './Styles/PostCardStyle';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
const PostCard=({navigation, item})=> {
    const [totalComments, setTotalComments]=useState(item.comments)
    const handlePost=()=>{
     navigation.navigate('comments',{item})
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
                        <Text style={PostCardStyle.date}>{item.created_at.substring(0,10)}</Text>
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