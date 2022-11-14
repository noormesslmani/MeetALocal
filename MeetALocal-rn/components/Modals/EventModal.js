import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import EventModalStyles from '../ComponentsStyles/EventModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { categoryIcons } from '../../constants/categories';
import { toggleSaveEvent, isEventSaved } from '../../network/App';
import { UserContext } from '../../App'
import { deleteEvents } from '../../network/App';
import { colors } from '../../constants/colors';
const EventModal=({navigation, modalVisible, setModalVisible, item, choice, setDeleted})=> {
    const { user, setUser} = useContext(UserContext);
    const [categories, setCategories]=useState([])
    const [isSaved, setIsSaved]=useState(false)
    useEffect(()=>{
        if(modalVisible)
        {
          setCategories(item.categories)
          if(user.type_id==2){isSavedEvent()}
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
            
        </View>
      </View>
    </Modal>
  )
}
export default EventModal