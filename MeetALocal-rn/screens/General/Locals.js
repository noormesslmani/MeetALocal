import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import LocalsStyles from './Styles/LocalsPageStyles';
import LocalCard from '../../components/Home/LocalsCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import FilterModal from '../../components/Home/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons'
const Locals=({navigation})=> {
    const [country, setCountry]=useState('all');
    const [category, setCategory]=useState('all');
    const [viewFav, setViewFav]=useState(false)
    const [data, setdata]=useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const { user, setUser, locals, setLocals} = useContext(UserContext);
    
    useEffect(()=>{
      if(!viewFav){
        getLocals()}
      else{
        getFavorites()
      }
    },[viewFav, country, category])
    
    async function getLocals(){
      const token = await AsyncStorage.getItem('@token')
      axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}`},
        url:`http://192.168.1.7:8000/api/v1.0.0/users/locals/${country}/${category}`,
      })
      .then((response)=> {
        setdata(response.data.data)
        setLocals(response.data.data)
        return response;
      })
      .catch(function (error) {
        console.warn(error)
      });
  }

  async function getFavorites(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:"http://192.168.1.7:8000/api/v1.0.0/foreigners/favorites",
    })
    .then((response)=> {
      setdata(response.data.favorites)
      return response;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }
  
  const renderItem = ({ item }) => (
    <LocalCard item={item} key={item} navigation={navigation} />);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
      headerRight:()=>(<View style={{flexDirection:"row"}}>
      <Pressable onPress={()=>{setModalVisible(true)}}><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>
      <Pressable onPress={() => navigation.navigate('locals-map')} style={{marginLeft:10}}><Ionicons name="location-sharp" size={25} color="#8C57BA"/></Pressable>
      </View>)
    });
  }, [navigation]);
  return (
      <View style={HomeStyles.container}>
        {user.type_id==2 && <View style={LocalsStyles.view}>
            <TouchableOpacity onPress={()=>setViewFav(false)} >{ <Text style={[LocalsStyles.options,viewFav? null: LocalsStyles.selected ]}>View All</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewFav(true)}>{ <Text style={[LocalsStyles.options, viewFav? LocalsStyles.selected: null]}>Favorites</Text>}</TouchableOpacity>
        </View>}
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <View style={LocalsStyles.separator}/>
        <SafeAreaView>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            key={item => item.id}
            keyExtractor={item => item.id}
            style={LocalsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
          />
        </SafeAreaView>
      </View>
    )
}
 
export default Locals