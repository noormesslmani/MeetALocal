import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
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
import { colors } from '../../constants/colors';
import ListFooter from '../../components/General/ListFooter';
import { useDidMountEffect } from '../../hooks/Hooks';
const Posts=({navigation})=> {
  const [viewOwn, setViewOwn]=useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newPostModalVisible, setNewPostModalVisible] = useState(false)
  const [isListEnd, setIsListEnd]=useState(false)
  const [isLoadingMore, setIsLoadingMore]=useState(false)
  const [isLoading, setIsLoading]= useState(false)
  const [page, setPage]=useState(0)

  useEffect(() => {
    if(!viewOwn){
    navigation.setOptions({
      headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
      headerRight:()=><Filters handleFilter={handleFilter}/>})
    }
    else{
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
        headerRight:()=><></>})
    }
  }, [navigation, viewOwn])

  useDidMountEffect(() => {
    page==0? getPosts(): setPage(0)
    setdata([])
    setIsListEnd(false)
  }, [viewOwn, country, category]); 

  useEffect(()=>{
    getPosts()
  },[page])
  

  const getPosts= async()=>{
    let result
    page==0? setIsLoading(true): setIsLoadingMore(true)
    if(viewOwn){
      result = await getOwnPosts()
      if (result.success){
        setIsLoading(false)
        setdata(result.data.data)
      }
    }
    else {
      result = await getAllPosts(country, category, 20*page)
      if (result.success){
        setIsLoading(false)
        setIsLoadingMore(false)
        if(result.data.data.length==0){
          setIsListEnd(true)
          console.log(page)
        }
        else{
          setdata( data =>[...data, ...result.data.data])
        }
      }
    }
  }
  const handleFilter=()=>{
    setModalVisible(true)
  }
  
  const renderItem = ({ item }) => (
    <PostCard item={item} navigation={navigation} key={item.id}/>);
  
    const fetchMore=()=>{
      if(!isListEnd){
        setPage(page+1)
      }
    }
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
        <NewPostModal modalVisible={newPostModalVisible} setModalVisible={setNewPostModalVisible}/>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={PostsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:null}
            onEndReachedThreshold={1}
            onEndReached={fetchMore}
            ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} isListEnd={isListEnd} />}
          />
        </SafeAreaView>
      </View>
    )
}
 
export default Posts