import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from '../../App'
import LocalsStyles from './Styles/LocalsPageStyles';
import FilterModal from '../../components/Modals/FilterModal';
import LocalCard from '../../components/Cards/LocalCard';
import Filters from '../../components/Header/Filters';
import BackArrow from '../../components/Header/BackArrow';
import { getLocals, getFavorites } from '../../network/App';
import Map from '../../components/Header/Map';
import { colors } from '../../constants/colors';
import ListFooter from '../../components/General/ListFooter';
import { useDidMountEffect } from '../../hooks/Hooks';
import {  useIsFocused } from '@react-navigation/native';
import AppButton from '../../components/Buttons/AppButtons';
import EmptyPage from '../../components/General/EmptyPage';
import ListHeader from '../../components/General/ListHeaders';
const Locals=({navigation})=> {
    const [country, setCountry]=useState('all');
    const [category, setCategory]=useState('all');
    const [viewFav, setViewFav]=useState(false)
    const [data, setdata]=useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [isListEnd, setIsListEnd]=useState(false)
    const [isLoadingMore, setIsLoadingMore]=useState(false)
    const [isLoading, setIsLoading]= useState(false)
    const { user, setUser, locals, setLocals} = useContext(UserContext);
    const [page, setPage]=useState(0)


   
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
        headerRight:()=>(<View style={{flexDirection:"row"}}>
        {!viewFav && <Filters handleFilter={handleFilter}/>}
        <Map handleMap={handleMap} />
        </View>)
      });
    }, [navigation, data, viewFav]);

    useDidMountEffect(() => {
      page==0? getLocalsList(): setPage(0)
      setdata([])
      setIsListEnd(false)
      
    }, [viewFav, country, category]); 

    const isFocused = useIsFocused();

    useEffect(() => {
      if(isFocused)  {
        getLocalsList()
      }
      else{
        setdata([])
        setPage(0)
      }
    },[isFocused, page])
    
    console.log(data)



  const getLocalsList= async()=>{
    page==0? setIsLoading(true): setIsLoadingMore(true)
    if(!viewFav){
        const params={
          country,
          category,
          offset:15*page
        }
        console.log(params)
        const result = await getLocals(params)
        if (result.success){
          setIsLoading(false)
          setIsLoadingMore(false)
          if(result.data.data.length==0){
            setIsListEnd(true)
          }  
          else{
            setdata( data =>[...data, ...result.data.data])
            setLocals( locals =>[...locals, ...result.data.data])
          }
        }
      }
    else{
      const result = await getFavorites()
      if (result.success){
        setIsLoading(false)
        setdata(result.data.data)
      }
    }
  } 
 
  const renderItem = ({ item, index }) => (
    <LocalCard item={item}  navigation={navigation}/>
  );

  const handleFilter=()=>{
    setModalVisible(true)
  }
  const handleMap=()=>{
    if(!isLoading){
      navigation.navigate('locals-map',{data: data, type:1})
    }
  }
  const fetchMore=()=>{
    if(!isListEnd && !isLoadingMore){
      setPage(page+1)
    }
  }
 
  return (
      <View style={HomeStyles.container}>
         
        {user.type_id==2 && <View style={LocalsStyles.view}>
            <AppButton text='View All' handlePress={()=>setViewFav(false)} type={viewFav?2:1} />
            <AppButton text='Favorites' handlePress={()=>setViewFav(true)} type={viewFav?1:2} />
        </View>}
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
       
        <SafeAreaView style={LocalsStyles.listContainer}>
        {!isLoading && data.length==0? <EmptyPage />:null}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={LocalsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />: !viewFav? <ListHeader country={country} category={category}/>:null}
            onEndReachedThreshold={0.1}
            onEndReached={fetchMore}
            ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} isListEnd={isListEnd} />}
          />
        </SafeAreaView>
      </View>
    )
}
 
export default Locals