import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventModalStyles from '../ComponentsStyles/EventModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { categoryIcons } from '../../constants/categories';
import { toggleSaveEvent, isEventSaved } from '../../network/App';
const EventModal=({navigation, modalVisible, setModalVisible, item})=> {
   const [categories, setCategories]=useState([])
    const [isSaved, setIsSaved]=useState(false)
    useEffect(()=>{
        if(modalVisible)
        {setCategories(item.categories)
         isSavedEvent()}
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
            <Image source={item.photo?{ uri:`http://192.168.1.7:8000/${item.photo}`}: require('../../assets/blank-profile.webp')} style={EventModalStyles.image}/>
            <View style={EventModalStyles.titleContainer}>
              <Text style={{fontSize:20, fontWeight:"600"}}>{item.title}</Text>
              <Pressable onPress={handleSave}>
                {isSaved?<Icon name="star" color="#FFD700" size={30} />: <Icon name="star-o" color="#FFD700" size={30} />}
              </Pressable>
            </View>
            <View style={EventModalStyles.infoContainer}>
              <Text style={{fontSize:13}}>By: {item.name}</Text>
              <Text style={{fontSize:13}}>Where: {item.place}, {item.country}</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{fontSize:13}}>When: {item.date}</Text>
                <Text style={{fontSize:13, fontWeight:"500"}}>Fees: {item.fees}$</Text>
              </View>
            </View>
            <View style={EventModalStyles.detailsContianer}>
              <Text style={{fontSize:20, fontWeight:"400"}}>Details:</Text>
              <Text style={{fontSize:12}}>{item.details}</Text>
            </View>
            <View style={EventModalStyles.detailsContianer}>
              <Text style={{fontWeight:"400"}}>Categories:</Text>
              <View style={{flexDirection:"row"}}>
              {categories.map((category)=><Image source={categoryIcons[category]} style={{width:35, height:35, margin:15}} />)}
              </View>
            </View>
            
        </View>
      </View>
    </Modal>
  )
}
export default EventModal