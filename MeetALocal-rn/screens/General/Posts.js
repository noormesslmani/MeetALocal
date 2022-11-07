import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import LocalCard from '../../components/Cards/LocalsCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import FilterModal from '../../components/Modals/FilterModal';
import PostsStyles from './Styles/PostsStyles';
import NewPostModal from '../../components/Modals/NewPostModal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostCard from '../../components/Cards/PostsCard'
const Posts=({navigation})=> {
  const [viewOwn, setViewOwn]=useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newPostModalVisible, setNewPostModalVisible] = useState(false)
  useEffect(()=>{
    if(!viewOwn){
      getPosts()
      console.log('hi')
    }
    else{
      getOwnPosts()
    }
  },[viewOwn, country, category])
  async function getPosts(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`http://192.168.1.7:8000/api/v1.0.0/users/posts/${country}/${category}`,
    })
    .then((response)=> {
      console.log(response.data.data)
      setdata(response.data.data)
      return response;
    })
    .catch(function (error) {
      console.warn(error)
   });
  }
  async function getOwnPosts(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:'http://192.168.1.7:8000/api/v1.0.0/users/posts',
    })
    .then((response)=> {
      setdata(response.data.data)
      return response;
    })
    .catch(function (error) {
      console.warn(error)
   });
  }
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
      headerRight:()=>(
      <Pressable onPress={()=>{setModalVisible(true)}}><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>)}
      )}, [navigation])
  const renderItem = ({ item }) => (
    <PostCard item={item} navigation={navigation} key={item.id}/>);
  return (
      <View style={HomeStyles.container}>
        <View style={PostsStyles.view}>
            <TouchableOpacity onPress={()=>setViewOwn(false)} >{ <Text style={[PostsStyles.options,viewOwn? null: PostsStyles.selected ]}>All Posts</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewOwn(true)}>{ <Text style={[PostsStyles.options, viewOwn? PostsStyles.selected: null]}>My Posts</Text>}</TouchableOpacity>
        </View>

        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <TouchableOpacity onPress={()=>{setNewPostModalVisible(true)}}>
          <Text style={PostsStyles.newPost}>New Post</Text>
        </TouchableOpacity>
        <View style={PostsStyles.separator}/>
        <NewPostModal modalVisible={newPostModalVisible} setModalVisible={setNewPostModalVisible}/>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={PostsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
          />
        </SafeAreaView>
      </View>
    )
}
 
export default Posts