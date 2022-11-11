import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import LocalsStyles from './Styles/LocalsPageStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import FilterModal from '../../components/Modals/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LocalCard from '../../components/Cards/LocalCard';
import Filters from '../../components/Header/Filters';
import BackArrow from '../../components/Header/BackArrow';
import { getLocals, getFavorites } from '../../network/App';
import Map from '../../components/Header/Map';
import { colors } from '../../constants/colors';
import ListFooter from '../../components/General/ListFooter';
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
    useEffect(()=>{
      if(!viewFav){
        getAllLocals()
      }
      else{
        getFavoriteLocals()
      }
    },[viewFav, country, category, page])

  const getAllLocals= async()=>{
    page==0? setIsLoading(true): setIsLoadingMore(true)
    const result = await getLocals(country, category, 15*page)
    if (result.success){
      setIsLoading(false)
      setIsLoadingMore(false)
      if(result.data.data.length==0){
        setIsListEnd(true)
        console.log(page)
      }
      else{
        setdata( data =>[...data, ...result.data.data])
        setLocals( locals =>[...locals, ...result.data.data])
      }
    }
  } 
  const getFavoriteLocals=async()=>{
    const result = await getFavorites()
    if (result.success){
      setdata(result.data.data)
    }
  } 
  const renderItem = ({ item, index }) => (
    <LocalCard item={item} key={index} navigation={navigation} />
    );
  const handleFilter=()=>{
    setModalVisible(true)
  }
  const handleMap=()=>{
    navigation.navigate('locals-map',{data: data})
  }
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackArrow navigation={navigation}/>,
      headerRight:()=>(<View style={{flexDirection:"row"}}>
      {!viewFav && <Filters handleFilter={handleFilter}/>}
      <Map handleMap={handleMap} />
      </View>)
    });
  }, [navigation, data, viewFav]);
  const fetchMore=()=>{
    if(!isListEnd){
      setPage(page+1)
    }
  }
  return (
      <View style={HomeStyles.container}>
        {user.type_id==2 && <View style={LocalsStyles.view}>
            <TouchableOpacity onPress={()=>setViewFav(false)} >{ <Text style={[LocalsStyles.options,viewFav? null: LocalsStyles.selected ]}>View All</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewFav(true)}>{ <Text style={[LocalsStyles.options, viewFav? LocalsStyles.selected: null]}>Favorites</Text>}</TouchableOpacity>
        </View>}
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        {user.type_id==2 && <View style={LocalsStyles.separator}/>}
        <SafeAreaView>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={LocalsStyles.list}
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
 
export default Locals