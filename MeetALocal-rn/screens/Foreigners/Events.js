import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import EventsStyles from './Styles/EventsPageStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import FilterModal from '../../components/Home/FilterModal';
import EventCard from '../../components/Home/EventsCard';
const Events=({navigation})=> {
  const [viewSaved, setViewSaved]=useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])

  
  useEffect(()=>{
    if(!viewSaved){
      getEvents()}
  },[viewSaved, country, category])
  
  async function getEvents(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`http://192.168.1.7:8000/api/v1.0.0/users/events/${country}/${category}`,
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

  const renderItem = ({ item }) => (
    <View style={EventsStyles.cardsContainer}>
      <EventCard item={item} />
      <EventCard item={item} />
    </View>
  )

  return (
    <View style={HomeStyles.container}>
        <Text style={EventsStyles.title}>Events</Text>
        <View style={EventsStyles.view}>
            <TouchableOpacity onPress={()=>setViewSaved(false)} >{ <Text style={[EventsStyles.options,viewSaved? null: EventsStyles.selected ]}>View All</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewSaved(true)}>{ <Text style={[EventsStyles.options, viewSaved? EventsStyles.selected: null]}>Saved</Text>}</TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{setModalVisible(true)}}><Text style={{color:'grey', marginBottom:5}}>Filter</Text></TouchableOpacity>
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <View style={EventsStyles.separator}/>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={EventsStyles.list}
            contentContainerStyle={{paddingTop:20, paddingBottom: 300}}
          />
        </SafeAreaView>
      </View>
  )
}
export default Events