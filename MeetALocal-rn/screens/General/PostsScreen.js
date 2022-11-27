import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import FilterModal from '../../components/Modals/FilterModal';
import PostsStyles from './Styles/PostsStyles';
import NewPostModal from '../../components/Modals/NewPostModal';
import PostCard from '../../components/Cards/PostCard';
import { getAllPosts, getOwnPosts } from '../../network/App';
import Filters from '../../components/Header/Filters';
import { colors } from '../../constants/colors';
import ListFooter from '../../components/General/ListFooter';
import { useIsFocused } from '@react-navigation/native';
import AppButton from '../../components/Buttons/AppButtons';
import ListHeader from '../../components/General/ListHeaders';
import EmptyPage from '../../components/General/EmptyPage';
import AddIcon from '../../components/General/AddIcon';
const Posts=({navigation})=> {

  //Either view all posts or own posts
  const [viewOwn, setViewOwn]=useState(false);
  const [viewOwnChange, setViewOwnChange]=useState(false);

  //filtering data
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  //saving data
  const [data, setdata]=useState([]);
  
  //filter modal
  const [modalVisible, setModalVisible] = useState(false);
  const [filterChange, setFilterChange]=useState(false);
  
  //new post modal
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  
  const [isListEnd, setIsListEnd]=useState(false);
  const [isLoadingMore, setIsLoadingMore]=useState(false);
  const [isLoading, setIsLoading]= useState(false);
  const [page, setPage]=useState(0);
  
  //hanlde addition of new post
  const [postAdded, setPostAdded]=useState(false);

  useEffect(() => {
    if(!viewOwn){
    navigation.setOptions({
      headerRight:()=><Filters handleFilter={handleFilter}/>});
    }
    else{
      navigation.setOptions({
        headerRight:()=><></>});
    }
  }, [navigation, viewOwn]);


  //get posts when options change
  useEffect(() => {
    if(filterChange || viewOwnChange){
      page==0? getPosts(): setPage(0);
      setdata([]);
      setIsListEnd(false);
      setFilterChange(false);
      setViewOwnChange(false);
    }
  }, [filterChange, viewOwnChange]); 

  //hanlde the addition of new post
  useEffect(()=>{
    if(postAdded){
      getPosts();
      setPostAdded(false);
    }
  },[postAdded])

  //get posts when the page changes (20 per page)
  const isFocused = useIsFocused();
    useEffect(() => {
      if(isFocused)  {
        getPosts();
      }
      else{
        setdata([]);
        setPage(0);
        setIsLoading(true);
      }
    },[isFocused, page])


  const getPosts= async()=>{
    let result;
    if(viewOwn){
      setIsLoading(true);
      result = await getOwnPosts();
      if (result.success){
        setIsLoading(false);
        setdata(result.data.data);
        setIsListEnd(true);
      }
    }
    else {
      page==0? setIsLoading(true): setIsLoadingMore(true);
      result = await getAllPosts({country, category, offset:20*page});
      if (result.success){
        setIsLoading(false);
        setIsLoadingMore(false);
        setdata( data =>[...data, ...result.data.data]);
        if(result.data.data.length<20){
          setIsListEnd(true);
  
        }
      }
    }
  }

  //show filter modal
  const handleFilter=()=>{
    setModalVisible(true);
  }
   
  //update page when possible
  const fetchMore=()=>{
    if(!isListEnd){
      setPage(page+1);
    }
  }

  //view all posts
  const handleViewAll=()=>{
    setViewOwn(false);
    setViewOwnChange(true);
  }

  //view user's own posts
  const handleViewOwn=()=>{
    setViewOwn(true);
    setViewOwnChange(true);
  }
  return (
      <View style={PostsStyles.container}>
        {viewOwn && <AddIcon handlePress={()=>setNewPostModalVisible(true)} />}
        <View style={PostsStyles.view}>
            <AppButton text='All Posts' handlePress={handleViewAll} type={viewOwn?2:1} />
            <AppButton text='My Posts' handlePress={handleViewOwn} type={viewOwn?1:2} />
        </View>

        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory} setFilterChange={setFilterChange} />
        <NewPostModal modalVisible={newPostModalVisible} setModalVisible={setNewPostModalVisible} setPostAdded={setPostAdded} />
        <SafeAreaView style={PostsStyles.listContainer}>
        {!isLoading && data.length==0? <EmptyPage />:null}
          <FlatList
            data={data}
            renderItem={({ item }) => (<PostCard item={item} navigation={navigation} key={item.id} />)}
            keyExtractor={item => item.id}
            style={PostsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />: data.length>0 ?<ListHeader country={country} category={category} />: null }
            onEndReachedThreshold={1}
            onEndReached={!viewOwn && fetchMore}
            ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} isListEnd={isListEnd} />}
          />
        </SafeAreaView>
       
      </View>
    )
}
 
export default Posts