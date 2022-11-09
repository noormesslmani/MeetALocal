import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import FilterModal from '../../components/Modals/FilterModal';
import PostsStyles from './Styles/PostsStyles';
import NewPostModal from '../../components/Modals/NewPostModal';
import PostCard from '../../components/Cards/PostCard';
import { getAllPosts, getOwnPosts } from '../../network/App';
import Filters from '../../components/Header/Filters';
import BackArrow from '../../components/Header/BackArrow';
const Posts=({navigation})=> {
  const [viewOwn, setViewOwn]=useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newPostModalVisible, setNewPostModalVisible] = useState(false)
  useEffect(()=>{
    getPosts()
  },[viewOwn, country, category])
  
  const getPosts= async()=>{
    let result
    if(viewOwn){
      result = await getOwnPosts()
    }
    else {
      result = await getAllPosts(country, category)
    }
    if (result.success){
      setdata(result.data.data)
    }
  }
  const handleFilter=()=>{
    setModalVisible(true)
  }
  useEffect(() => {
    if(!viewOwn){
    navigation.setOptions({
      headerLeft: () => <BackArrow navigation={navigation} />,
      headerRight:()=><Filters handleFilter={handleFilter}/>})
    }
    else{
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation} />,
        headerRight:()=><></>})
    }
    }, [navigation, viewOwn])
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