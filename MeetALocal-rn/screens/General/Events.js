import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import EventsStyles from './Styles/EventsPageStyles';
import FilterModal from '../../components/Modals/FilterModal';
import NewEventModal from '../../components/Modals/NewEventModal';
import EventCard from '../../components/Cards/EventCard';
import {getAllEvents, getSavedEvents, getOwnEvents, getBookedEvents} from '../../network/App'
import BackArrow from '../../components/Header/BackArrow';
import Filters from '../../components/Header/Filters';
import { colors } from '../../constants/colors';
const Events=({navigation})=> {
  const [choice, setChoice]=useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])
  const [eventDeleted, setEventDeleted]=useState(false)
  const [eventBooked, setEventBooked]=useState(false)
  const [eventModalVisible, setEventModalVisible]=useState(false)
  const { user, setUser} = useContext(UserContext);
  const [eventCreated,setEventCreated]=useState(false)
  const [isLoading, setIsLoading]=useState(false)
  useEffect(()=>{
    getEvents()
  },[choice, country, category, eventCreated])
  useEffect(()=>{
    if(eventDeleted || eventBooked){
      getEvents()
      setEventBooked(false)
      setEventDeleted(false)
    }
  },[eventDeleted, eventBooked])
  
  const getEvents= async()=>{
    let result
    setIsLoading(true)
    if(choice==1){
      const params={
        country,
        category
      }
      result = await getAllEvents(params)
    }
    else if(choice==2){
      result = await getSavedEvents()
    }
    else if(choice==3){
      result = await getOwnEvents()
    }
    else if(choice==4){
      result = await getBookedEvents()
    }
    if (result.success){
      setdata(result.data.data)
    }
    setIsLoading(false)
  }
  const handleFilter=()=>{
    setModalVisible(true)
  }
  const renderItem = ({ item }) => (
    <View>
      <EventCard item={item} choice={choice} setEventDeleted={setEventDeleted} setEventBooked={setEventBooked}/>
    </View>
  )
  useEffect(() => {
    if(choice==1){
    navigation.setOptions({
      headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
      headerRight:()=><Filters handleFilter={handleFilter}/>})
    }
    else{
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation} type={1} />,
        headerRight:()=><></>})
      }
    }, [navigation, choice])
    
  return (
    <View style={HomeStyles.container}>
        <View style={EventsStyles.view}>
            <TouchableOpacity onPress={()=>setChoice(1)} >{ <Text style={[EventsStyles.options,choice==1 ? EventsStyles.selected: null ]}>All Events</Text>}</TouchableOpacity>
            {user.type_id==2 && <TouchableOpacity onPress={()=>setChoice(2)}>{ <Text style={[EventsStyles.options, choice==2 ? EventsStyles.selected: null]}>Saved Events</Text>}</TouchableOpacity>}
            {user.type_id==2 && <TouchableOpacity onPress={()=>setChoice(4)}>{ <Text style={[EventsStyles.options, choice==4 ? EventsStyles.selected: null]}>Bookings</Text>}</TouchableOpacity>}
            {user.type_id==1 && <TouchableOpacity onPress={()=>setChoice(3)}>{ <Text style={[EventsStyles.options, choice==3? EventsStyles.selected: null]}>My Events</Text>}</TouchableOpacity>}
        </View>
        <View style={EventsStyles.separator}/>
        {user.type_id==1 && <TouchableOpacity onPress={()=>{setEventModalVisible(true)}}><Text style={{color:"#8C57BA", marginBottom:5, textDecorationLine:"underline"}}>Create an event</Text></TouchableOpacity>}
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <NewEventModal modalVisible={eventModalVisible} setModalVisible={setEventModalVisible} setEventCreated={setEventCreated}/>
        <SafeAreaView style={EventsStyles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            Key={2}
            keyExtractor={item => item.id}
            style={EventsStyles.list}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:null}
            contentContainerStyle={{paddingTop:20, paddingBottom: 300}}
          />
        </SafeAreaView>
      </View>
  )
}
export default Events