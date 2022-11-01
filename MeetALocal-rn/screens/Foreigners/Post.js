import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import LocalCard from '../../components/Home/LocalsCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import PostsStyles from './Styles/PostsStyles';
import { useRoute } from '@react-navigation/native';
const Post=({navigation})=> {
    const route = useRoute();
    const item= route.params.item
    console.log(item)
  return (
      <View style={HomeStyles.container}>
        <Text>This is post page</Text>
      </View>
    )
}
 
export default Post