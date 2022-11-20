import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext, useCallback } from "react";
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
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AppButton from '../../components/Buttons/AppButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListHeader from '../../components/General/ListHeaders';
import EmptyPage from '../../components/General/EmptyPage';
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

  const isFocused = useIsFocused();

    useEffect(() => {
      if(isFocused)  {
        getPosts()
      }
      else{
        setdata([])
        setPage(0)
      }
    },[isFocused, page])


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
      const params={
        country,
        category,
        offset:20*page
      }
      result = await getAllPosts(params)
      if (result.success){
        setIsLoading(false)
        setIsLoadingMore(false)
        if(result.data.data.length==0){
          setIsListEnd(true)
  
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
            <AppButton text='All Posts' handlePress={()=>setViewOwn(false)} type={viewOwn?2:1} />
            <AppButton text='My Posts' handlePress={()=>setViewOwn(true)} type={viewOwn?1:2} />
        </View>

        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <NewPostModal modalVisible={newPostModalVisible} setModalVisible={setNewPostModalVisible}/>
        <SafeAreaView style={PostsStyles.listContainer}>
        {!isLoading && data.length==0? <EmptyPage />:null}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={PostsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />: data.length>0 ?<ListHeader country={country} category={category} />: null }
            onEndReachedThreshold={1}
            onEndReached={fetchMore}
            ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} isListEnd={isListEnd} />}
          />
        </SafeAreaView>
        <TouchableOpacity onPress={()=>setNewPostModalVisible(true)} style={PostsStyles.add} ><Icon name= 'plus' size={50} color={colors.lightViolet} /></TouchableOpacity>
      </View>
    )
}
 
export default Posts