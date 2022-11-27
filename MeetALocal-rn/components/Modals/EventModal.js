import { View, Text, Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useState, useEffect, useContext} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { address } from '../../constants/address';
import { categoryIcons } from '../../constants/categories';
import { toggleSaveEvent, isEventSaved } from '../../network/App';
import { UserContext } from '../../context/UserContext';
import { deleteEvents } from '../../network/App';
import { getToken } from '../../network/Notifications';
import { colors } from '../../constants/colors';
import { Button} from 'react-native-paper';
import EventModalStyle from './Styles/EventModalStyle';
import { isEventBooked, toggleBookedEvent } from '../../network/App';
import { sendNotification, Notify } from '../../notifications/Notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
const EventModal=({navigation, modalVisible, setModalVisible, item, choice, setDeleted, setToggled})=> {
    const { user, setUser} = useContext(UserContext);
    const [categories, setCategories]=useState([]);
    const [isSaved, setIsSaved]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [isBooked, setIsBooked]=useState(false);

    //check if event is booked or saved for type 2 user(foreigners)
    useEffect(()=>{
      if(modalVisible)
      {
        setCategories(item.categories)
        if(user.type_id==2){
          isSavedEvent();
          isBookedEvent();
        }
      }
    },[modalVisible]);
   
    //hanlde toggle save
    const handleSave=()=>{
      toggleSave();
    }

    const toggleSave= async()=>{
      const result = await toggleSaveEvent({event_id: item.id,});
      if (result.success){
        setToggled(true);
        setIsSaved(! isSaved);
      }
    }
    
    //check if event is saved
    const isSavedEvent= async()=>{
      const result = await isEventSaved(item.id);
      if (result.success){
        result.data.data? setIsSaved(true): setIsSaved(false);
      }
    }

    //check if event is booked
    const isBookedEvent= async()=>{
      setIsLoading(true);
      const result = await isEventBooked(item.id);
      if (result.success){
        result.data.data? setIsBooked(true): setIsBooked(false);
        setIsLoading(false);
      }
    }

    //deleting an event for organizers(locals)
    const handleDelete=async()=>{
      const result = await deleteEvents({event_id: item.id});
      if (result.success){
        setModalVisible(false);
        setDeleted(true);
      }
    }

    //booking an event (for foreigners) and sending notifications upon booking
    const handleBooking=async()=>{
      setIsLoading(true);
      const result = await toggleBookedEvent({event_id: item.id});
      if (result.success){
        setModalVisible(false);
        setToggled(true);
        if(! isBooked){
          const token= await AsyncStorage.getItem("@expoToken");
          sendNotification(token,'Meet A Local',`Event ${item.title} has been successfully booked. `);
          const result= await getToken(item.organizer_id);
          sendNotification(result.data.token,'Meet A Local',`Your event ${item.title} was booked by ${user.name} `);
        }
      }
      setIsLoading(false);
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
              <Text style={EventModalStyle.info}><Text style={{fontWeight:'500'}}>By</Text>: {item.name}</Text>
              <Text style={EventModalStyle.info}><Text style={{fontWeight:'500'}}>Where</Text>: {item.place}, {item.country}</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={EventModalStyle.info}><Text style={{fontWeight:'500'}}>When</Text>: {item.date}</Text>
                <Text style={EventModalStyle.fees}><Text style={{fontWeight:'500'}}>Fees</Text>: {item.fees}$</Text>
              </View>
              <Text><Text style={{fontWeight:'500'}}>Seats</Text>: {item.seats - item.bookings}</Text>
              {isLoading && <ActivityIndicator color={colors.violet} /> }
              {user.type_id==2 && ((item.seats - item.bookings) >0) && !isBooked && !isLoading &&
                <Button onPress={handleBooking} compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 16 }} style={EventModalStyle.bookBtn} icon={()=><Icon name='calendar' color={colors.violet} size={18} />}  mode="outlined" > 
                Book
               </Button>
              }
              {user.type_id==2 && isBooked && !isLoading &&
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