import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventModalStyles from '../ComponentsStyles/EventModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
import image from '../../assets/Baalbeck.jpg'
const EventModal=({navigation, modalVisible, setModalVisible, item})=> {
   console.log(item) 
   const [categories, setCategories]=useState([])
    const [icons, setIcons]=useState([])
    useEffect(()=>{
        setIcons([])
        setCategories(item.categories)
    },[])
    useEffect(()=>{
        for(let category of categories){
            switch(category) {
                case 'Tourism':
                    setIcons((icons)=>[...icons, tourism])
                  break;
                case 'Language':
                    setIcons((icons)=>[...icons, languages])
                  break;
                case 'Culture':
                setIcons((icons)=>[...icons, cultures])
                    break;
                case 'History':
                    setIcons((icons)=>[...icons, history])
                    break;
                case 'Education':
                    setIcons((icons)=>[...icons, education])
                    break;
                case 'Jobs':
                    setIcons((icons)=>[...icons, jobs])
                    break;
                case 'Housing':
                    setIcons((icons)=>[...icons, house])
                break;
                case 'Guidance':
                    setIcons((icons)=>[...icons, guidance])
                break;
            }
        }
    },[categories])
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
            <Image source={image} style={EventModalStyles.image}/>
            <View style={EventModalStyles.titleContainer}>
              <Text style={{fontSize:20, fontWeight:"600"}}>{item.title}</Text>
              <Pressable><Icon name="star-o" color="#FFD700" size={30} /></Pressable>
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
              {icons.map((icon)=><Image source={icon} style={{width:35, height:35, margin:15}} />)}
            </View>
            
        </View>
      </View>
    </Modal>
  )
}
export default EventModal