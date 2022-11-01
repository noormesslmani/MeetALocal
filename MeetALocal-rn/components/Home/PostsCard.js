import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostCardStyles from '../ComponentsStyles/PostCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
import image from '../../assets/profile.jpg'
import CommentsModal from './CommentsModal';

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
                </View>
            </View>
        </View>
        <Text style={{fontSize:11, marginLeft:60, fontWeight:"200", alignSelf:"flex-start"}}>{item.details}</Text>
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