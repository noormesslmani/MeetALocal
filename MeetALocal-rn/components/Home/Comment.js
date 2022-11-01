import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import EventModal from './EventModal';
import CommentStyles from '../ComponentsStyles/CommentStyles';
const Comment=({navigation, item, comment})=> {
  
  return (
    <View style={CommentStyles.commentContainer}>
        <View style={CommentStyles.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={image} style={CommentStyles.image} />
                <View style={CommentStyles.details}>
                    <Text style={{fontSize:10, fontWeight:"600"}}>{comment.user.name}</Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      <Text style={{fontSize:10}}>country</Text>
                      {comment.user.type_id==2 && <Text style={{fontSize:8, marginLeft:5, color:"#8C57BA"}}>Local</Text>}
                    </View>
                    <Text style={{fontSize:10, marginTop:5, fontWeight:"300"}}>{comment.content}</Text>
                </View>
            </View>
        </View>
        <View>
         
        </View>
    </View>
  )
}
export default Comment