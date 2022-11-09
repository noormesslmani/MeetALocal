import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet } from 'react-native'
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
const Locals=({navigation})=> {
    const [country, setCountry]=useState('all');
    const [category, setCategory]=useState('all');
    const [viewFav, setViewFav]=useState(false)
    const [data, setdata]=useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const { user, setUser, locals, setLocals} = useContext(UserContext);
    useEffect(()=>{
      if(!viewFav){
        getAllLocals()
      }
      else{
        getFavoriteLocals()
      }
    },[viewFav, country, category])

  const getAllLocals= async()=>{
    const result = await getLocals(country, category)
    if (result.success){
      setdata(result.data.data)
      setLocals(result.data.data)
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
          />
        </SafeAreaView>
      </View>
    )
}
 
export default Locals