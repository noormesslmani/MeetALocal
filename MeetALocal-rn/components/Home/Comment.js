import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import EventModal from './EventModal';
import CommentStyles from '../ComponentsStyles/CommentStyles';
const Comment=({navigation, item})=> {
  return (
    <View style={CommentStyles.commentContainer}>
        <View style={CommentStyles.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={image} style={CommentStyles.image} />
                <View style={CommentStyles.details}>
                    <Text style={{fontSize:10, fontWeight:"600"}}>name</Text>
                    <View style={{flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize:10}}>country</Text>
                      <Text style={{fontSize:8, marginLeft:5, color:"#8C57BA"}}>Local</Text>
                    </View>
                    <Text style={{fontSize:10, marginTop:5}}>aaa Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </View>
            </View>
        </View>
        <View>
         
        </View>
    </View>
  )
}
export default Comment