import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import LocalsStyles from './Styles/LocalsPageStyles';
import LocalCard from '../../components/Home/LocalsCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const Locals=({navigation})=> {
    const [viewFav, setViewFav]=useState(false)
    const [data, setdata]=useState([])
    const { user, setUser} = useContext(UserContext);
    console.log(user.id)
    useEffect(()=>{
      console.log('hi')
      if(!viewFav){
        getLocals()}
      else{
        getFavorites()
      }
    },[viewFav])

    async function getLocals(){
      const token = await AsyncStorage.getItem('@token')
      axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}`},
        url:"http://192.168.1.7:8000/api/v1.0.0/users/locals/all/all/all",
      })
      .then((response)=> {
        setdata(response.data.data)
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
    <LocalCard item={item} />);
  
  return (
      <View style={HomeStyles.container}>
        <Text style={LocalsStyles.title}>Locals</Text>
        <View style={LocalsStyles.view}>
            <TouchableOpacity onPress={()=>setViewFav(false)} >{user.type_id==2 && <Text style={[LocalsStyles.options,viewFav? null: LocalsStyles.selected ]}>View All</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewFav(true)}>{user.type_id==2 && <Text style={[LocalsStyles.options, viewFav? LocalsStyles.selected: null]}>Favorites</Text>}</TouchableOpacity>
        </View>
        <View style={LocalsStyles.separator}/>
        <Text>Filter</Text>
        <SafeAreaView>
          <FlatList
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