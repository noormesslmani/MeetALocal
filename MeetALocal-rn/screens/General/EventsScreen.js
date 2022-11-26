import { View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import EventsStyles from './Styles/EventsPageStyles';
import FilterModal from '../../components/Modals/FilterModal';
import NewEventModal from '../../components/Modals/NewEventModal';
import EventCard from '../../components/Cards/EventCard';
import {getAllEvents, getSavedEvents, getOwnEvents, getBookedEvents} from '../../network/App'
import Filters from '../../components/Header/Filters';
import { colors } from '../../constants/colors';
import AppButton from '../../components/Buttons/AppButtons';
import ListHeader from '../../components/General/ListHeaders';
import EmptyPage from '../../components/General/EmptyPage';
import AddIcon from '../../components/General/AddIcon';
const Events=({navigation})=> {
  const [choice, setChoice]=useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  const [data, setdata]=useState([])

  const [eventDeleted, setEventDeleted]=useState(false)
  const [eventToggled, setEventToggled]=useState(false)

  const [eventModalVisible, setEventModalVisible]=useState(false)
  const { user, setUser} = useContext(UserContext);
  const [eventCreated,setEventCreated]=useState(false)
  const [isLoading, setIsLoading]=useState(false)

  const [filterChange, setFilterChange]=useState(false)
  //get events 
  useEffect(()=>{
    getEvents()
  },[choice, country, category, eventCreated])

  //triggered when an events is deleted, booked, etc...
  useEffect(()=>{
    if(eventDeleted || eventToggled){
      getEvents()
      setEventDeleted(false)
      setEventToggled(false)
    }
  },[eventDeleted, eventToggled])

  //choice 1->get all events (for all)
  //choice 2->get saved events(for foreigners)
  //choice 3->get own events(for locals)
  //choice 4->get booked events(for foreigners)
  const getEvents= async()=>{
    let result
    setIsLoading(true)
    setdata([])
    if(choice==1){
      result = await getAllEvents({country, category})
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
  //show filter modal
  const handleFilter=()=>{
    setModalVisible(true)
  }
  //Event card
  const renderItem = ({ item }) => (
    <View>
      <EventCard item={item} choice={choice} setEventDeleted={setEventDeleted} setEventToggled={setEventToggled} />
    </View>
  )

  //header
  useEffect(() => {
    if(choice==1){
    navigation.setOptions({
      headerRight:()=><Filters handleFilter={handleFilter}/>})
    }
    else{
      navigation.setOptions({
        headerRight:()=><></>})
      }
    }, [navigation, choice])

  return (
    <View style={EventsStyles.container}>
        {user.type_id==1 && choice==3 && <AddIcon handlePress={()=>setEventModalVisible(true)} />}
        <View style={user.type_id==1? EventsStyles.view1: EventsStyles.view2}>
            <AppButton text="All Events" handlePress={()=>setChoice(1)} type={choice==1?1:2} /> 
            {user.type_id==2 && <AppButton text="Saved" handlePress={()=>setChoice(2)} type={choice==2?1:2}/> }
            {user.type_id==1 && <AppButton text="My Events" handlePress={()=>setChoice(3)} type={choice==3?1:2}/> }
            {user.type_id==2 && <AppButton text="Bookings" handlePress={()=>setChoice(4)} type={choice==4?1:2}/> }
        </View>
        <View style={EventsStyles.separator}/>

        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory} setFilterChange={setFilterChange}/>
        <NewEventModal modalVisible={eventModalVisible} setModalVisible={setEventModalVisible} setEventCreated={setEventCreated}/>
        <SafeAreaView style={EventsStyles.listContainer}>
          {!isLoading && data.length==0? <EmptyPage />:null}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            numColumns={2}
            Key={2}
            keyExtractor={item => item.id}
            style={EventsStyles.list}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:choice==1?<ListHeader country={country} category={category} />: null}
            contentContainerStyle={{paddingTop:20, paddingBottom: 300}}
          />
        </SafeAreaView>
      </View>
  )
}
export default Events