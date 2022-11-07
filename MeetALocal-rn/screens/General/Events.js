import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Pressable } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import EventsStyles from './Styles/EventsPageStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import FilterModal from '../../components/Home/FilterModal';
import EventCard from '../../components/Home/EventsCard';
import EventsModal from '../../components/Locals/EventsModal';
import Icon from 'react-native-vector-icons/Ionicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Events=({navigation})=> {
  const [choice, setChoice]=useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])
  const [eventModalVisible, setEventModalVisible]=useState(false)
  const { user, setUser} = useContext(UserContext);
  
  useEffect(()=>{
    if(choice==1){
      getEvents()
    }
    else if(choice==2){
      getSavedEvents()
    }
    else{
      getOwnEvents()
    }
  },[choice, country, category])
  
  async function getEvents(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`http://192.168.1.7:8000/api/v1.0.0/users/events/${country}/${category}`,
    })
    .then((response)=> {
      setdata(response.data.data)
      return response;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }
  
  async function getSavedEvents(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`http://192.168.1.7:8000/api/v1.0.0/users/events/saved`,
    })
    .then((response)=> {
      setdata(response.data.data)
      return response;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }

  async function getOwnEvents(){
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:'http://192.168.1.7:8000/api/v1.0.0/locals/events',
    })
    .then((response)=> {
      setdata(response.data.data)
      return response;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }

  const renderItem = ({ item }) => (
    <View>
      <EventCard item={item} />
    </View>
  )
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
      headerRight:()=>(
      <Pressable onPress={()=>{setModalVisible(true)}}><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>)}
      )}, [navigation])
  return (
    <View style={HomeStyles.container}>
        <View style={EventsStyles.view}>
            <TouchableOpacity onPress={()=>setChoice(1)} >{ <Text style={[EventsStyles.options,choice==1 ? EventsStyles.selected: null ]}>All Events</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setChoice(2)}>{ <Text style={[EventsStyles.options, choice==2 ? EventsStyles.selected: null]}>Saved Events</Text>}</TouchableOpacity>
            {user.type_id==1 && <TouchableOpacity onPress={()=>setChoice(3)}>{ <Text style={[EventsStyles.options, choice==3? EventsStyles.selected: null]}>My Events</Text>}</TouchableOpacity>}
        </View>
        <View style={EventsStyles.separator}/>
        {user.type_id==1 && <TouchableOpacity onPress={()=>{setEventModalVisible(true)}}><Text style={{color:"#8C57BA", marginBottom:5, textDecorationLine:"underline"}}>Create an event</Text></TouchableOpacity>}
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <EventsModal modalVisible={eventModalVisible} setModalVisible={setEventModalVisible}/>
        <SafeAreaView style={EventsStyles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            Key={2}
            keyExtractor={item => item.id}
            style={EventsStyles.list}
            contentContainerStyle={{paddingTop:20, paddingBottom: 300}}
          />
        </SafeAreaView>
      </View>
  )
}
export default Events