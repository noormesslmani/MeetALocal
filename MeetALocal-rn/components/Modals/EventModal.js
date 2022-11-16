import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useRef } from "react";
import EventModalStyles from '../ComponentsStyles/EventModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { categoryIcons } from '../../constants/categories';
import { toggleSaveEvent, isEventSaved } from '../../network/App';
import { UserContext } from '../../App'
import { deleteEvents } from '../../network/App';
import { colors } from '../../constants/colors';
import { Button} from 'react-native-paper';
import EventsModalStyles from '../ComponentsStyles/EventsModalStyles';
import { isEventBooked, toggleBookedEvent } from '../../network/App';
import { sendNotification, Notify } from '../../Notifications/Notifications';
const EventModal=({navigation, modalVisible, setModalVisible, item, choice, setDeleted, setBooked})=> {
    const { user, setUser} = useContext(UserContext);
    const [categories, setCategories]=useState([])
    const [isSaved, setIsSaved]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    const [isBooked, setIsBooked]=useState(false)

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(()=>{
        if(modalVisible)
        {
          Notify(setExpoPushToken, setNotification, notificationListener, responseListener)
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
        isBooked? sendNotification('Meet A Local','Event successfully unbooked'):sendNotification('Meet A Local','Event successfully booked')
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
        <View style={EventModalStyles.centeredView}>
        <View style={EventModalStyles.modalView}>
            <Image source={item.photo?{ uri:`${address}/${item.photo}`}: require('../../assets/blank-profile.webp')} style={EventModalStyles.image}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={EventModalStyles.titleContainer}>
              <Text style={EventModalStyles.title}>{item.title}</Text>
              {user.type_id==2 && <Pressable onPress={handleSave}>
                {isSaved?<Icon name="star" color={colors.gold} size={30} />: <Icon name="star-o" color={colors.gold} size={30} />}
              </Pressable>}
              {user.type_id==1 && choice==3 && <Pressable onPress={handleDelete}>
                <Icon name="trash-o" color="grey" size={30} />
              </Pressable>}
            </View>
            <View style={EventModalStyles.infoContainer}>
              <Text style={EventModalStyles.info}>By: {item.name}</Text>
              <Text style={EventModalStyles.info}>Where: {item.place}, {item.country}</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={EventModalStyles.info}>When: {item.date}</Text>
                <Text style={EventModalStyles.fees}>Fees: {item.fees}$</Text>
              </View>
              <Text>Seats: {item.seats - item.bookings}</Text>
              {isLoading && <ActivityIndicator color={colors.violet} /> }
              {user.type_id==2 && ((item.seats - item.bookings) >0) && !isBooked &&
                <Button onPress={handleBooking} compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 16 }} style={EventModalStyles.bookBtn} icon={()=><Icon name='calendar' color={colors.violet} size={18} />}  mode="outlined" > 
                Book
               </Button>
              }
              {user.type_id==2 && isBooked &&
                <Button onPress={handleBooking} compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 16 }} style={EventModalStyles.bookBtn} icon={()=><Icon name='calendar' color={colors.violet} size={18} />}  mode="outlined" > 
                Cancel Booking
               </Button>
              }
              {choice==3 && <View style={{flexDirection:"row", alignItems:"center"}}><Icon style={{margin:2}} name="star" color={colors.gold} size={20} /><Text>: {item.saves}</Text></View>}
            </View>
            <View style={EventModalStyles.detailsContianer}>
              <Text style={EventModalStyles.detailsTitle}>Details:</Text>
              <Text style={EventModalStyles.details}>{item.details}</Text>
            </View>
            <View style={EventModalStyles.detailsContianer}>
              <Text style={EventModalStyles.categoriesTitle}>Categories:</Text>
              <View style={{flexDirection:"row"}}>
              {categories.map((category)=><Image source={categoryIcons[category]} style={EventModalStyles.icons} />)}
              </View>
            </View>
          </ScrollView> 
        </View>
      </View>
    </Modal>
  )
}
export default EventModal