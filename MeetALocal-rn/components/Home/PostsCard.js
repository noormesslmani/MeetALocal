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
const PostCard=({navigation, item})=> {

    const [categories, setCategories]=useState([])
    const [icons, setIcons]=useState([])
    const handlePost=()=>{
        navigation.navigate('post', {item})
    }
  return (
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
            <Text style={PostCardStyles.comments}>{item.comments}</Text>
            <Icon name="comment-o" color="rgba(140, 87, 186, 0.34)" size={15} /> 
        </View>
    </TouchableOpacity>
  )
}
export default PostCard