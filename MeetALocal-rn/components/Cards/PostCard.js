import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostCardStyles from '../ComponentsStyles/PostCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import CommentsModal from '../Modals/CommentsModal';
import image from '../../assets/profile.jpg'


const PostCard=({navigation, item})=> {
    const [totalComments, setTotalComments]=useState(item.comments)
    const [categories, setCategories]=useState([])
    const [icons, setIcons]=useState([])
    const [modalVisible, setModalVisible]=useState(false)
    const handlePost=()=>{
    console.log('pressed')
    setModalVisible(true)}
  return (<>
    <TouchableOpacity style={PostCardStyles.card} onPress={handlePost}>
        <View style={PostCardStyles.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={image} style={PostCardStyles.image} />
                <View>
                    <Text style={{fontSize:10, marginLeft:10, fontWeight:"600"}}>{item.name}</Text>
                    <Text style={{fontSize:10, marginLeft:10}}>{item.country}</Text>
                    <Text style={PostCardStyles.postDetails}>{item.details}</Text>
                </View>
            </View>
        </View>
        <View style={PostCardStyles.commentsContainer}>
            <Text style={PostCardStyles.comments}>{totalComments}</Text>
            <Icon name="comment-o" color="rgba(140, 87, 186, 0.34)" size={15} /> 
        </View>
    </TouchableOpacity>
    <CommentsModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={item} totalComments={totalComments} setTotalComments={setTotalComments}/>
    </>
  )
}
export default PostCard