import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useRef } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Ionicons } from '@expo/vector-icons';
import { address } from '../../constants/address';
import { categoryIcons } from '../../constants/categories';
import { toggleSaveEvent, isEventSaved } from '../../network/App';
import { UserContext } from '../../App'
import { deleteEvents } from '../../network/App';
import { getToken } from '../../network/Notifications';
import { colors } from '../../constants/colors';
import { Button} from 'react-native-paper';
import EventModalStyle from './Styles/EventModalStyle';
import { isEventBooked, toggleBookedEvent } from '../../network/App';
import { sendNotification, Notify } from '../../notifications/Notifications';
const EventModal=({navigation, modalVisible, setModalVisible, item, choice, setDeleted, setBooked})=> {
    const { user, setUser} = useContext(UserContext);
    const [categories, setCategories]=useState([])
    const [isSaved, setIsSaved]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    const [isBooked, setIsBooked]=useState(false)


    useEffect(()=>{
        if(modalVisible)
        {
          setCategories(item.categories)
          if(user.type_id==2){
            isSavedEvent()
            isBookedEvent()
          }
        }
    },[modalVisible])
   
    const handleSave=()=>{
      toggleSave()
    }

    const toggleSave= async()=>{
      const data = {
        event_id: item.id,
      };
      const result = await toggleSaveEvent(data)
      if (result.success){
        setIsSaved(! isSaved)
      }
    }
    
    const isSavedEvent= async()=>{
      const result = await isEventSaved(item.id)
      if (result.success){
        result.data.data? setIsSaved(true): setIsSaved(false)
      }
    }
    const isBookedEvent= async()=>{
      const result = await isEventBooked(item.id)
      if (result.success){
        result.data.data? setIsBooked(true): setIsBooked(false)
      }
    }

    const handleDelete=async()=>{
      const data={
        event_id: item.id
      }
      const result = await deleteEvents(data)
      if (result.success){
        setModalVisible(false)
        setDeleted(true)
      }
    }
    const handleBooking=async()=>{
      setIsLoading(true)
      const data={
        event_id: item.id
      }
      const result = await toggleBookedEvent(data)
      if (result.success){
        setModalVisible(false)
        setBooked(true)
        if(! isBooked){
          const result= await getToken(item.organizer_id)
          sendNotification(result.data.token,'Meet A Local',`Your event ${item.title} was booked by ${user.name} `)
        }
      }
      setIsLoading(false)
    }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={EventModalStyle.centeredView}>
        <View style={EventModalStyle.modalView}>
            <Image source={item.photo?{ uri:`${address}/${item.photo}`}: require('../../assets/blank-profile.webp')} style={EventModalStyle.image}/>
            <Pressable style={{position:"absolute", right:10, top:10}} onPress={()=>setModalVisible(false)} ><Ionicons name='close' size={30} /></Pressable>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={EventModalStyle.titleContainer}>
              <Text style={EventModalStyle.title}>{item.title}</Text>
              {user.type_id==2 && <Pressable onPress={handleSave}>
                {isSaved?<Icon name="star" color={colors.gold} size={30} />: <Icon name="star-o" color={colors.gold} size={30} />}
              </Pressable>}
              {user.type_id==1 && choice==3 && <Pressable onPress={handleDelete}>
                <Icon name="trash-o" color="grey" size={30} />
              </Pressable>}
            </View>
            <View style={EventModalStyle.infoContainer}>
              <Text style={EventModalStyle.info}>By: {item.name}</Text>
              <Text style={EventModalStyle.info}>Where: {item.place}, {item.country}</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={EventModalStyle.info}>When: {item.date}</Text>
                <Text style={EventModalStyle.fees}>Fees: {item.fees}$</Text>
              </View>
              <Text>Seats: {item.seats - item.bookings}</Text>
              {isLoading && <ActivityIndicator color={colors.violet} /> }
              {user.type_id==2 && ((item.seats - item.bookings) >0) && !isBooked &&
                <Button onPress={handleBooking} compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 16 }} style={EventModalStyle.bookBtn} icon={()=><Icon name='calendar' color={colors.violet} size={18} />}  mode="outlined" > 
                Book
               </Button>
              }
              {user.type_id==2 && isBooked &&
                <Button onPress={handleBooking} compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 16 }} style={EventModalStyle.bookBtn} icon={()=><Icon name='calendar' color={colors.violet} size={18} />}  mode="outlined" > 
                Cancel Booking
               </Button>
              }
              
              {choice==3 && <View style={{flexDirection:"row", alignItems:"center"}}><Icon style={{margin:2}} name="star" color={colors.gold} size={20} /><Text>: {item.saves}</Text></View>}
            </View>
            <View style={EventModalStyle.detailsContianer}>
              <Text style={EventModalStyle.detailsTitle}>Details:</Text>
              <Text style={EventModalStyle.details}>{item.details}</Text>
            </View>
            <View style={EventModalStyle.detailsContianer}>
              <Text style={EventModalStyle.categoriesTitle}>Categories:</Text>
              <View style={{flexDirection:"row"}}>
              {categories.map((category, index)=><Image source={categoryIcons[category]} style={EventModalStyle.icons} key={index} />)}
              </View>
            </View>
          </ScrollView> 
        </View>
      </View>
    </Modal>
  )
}
export default EventModal