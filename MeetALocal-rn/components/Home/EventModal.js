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
            <Pressable
            style={EventModalStyles.button}>
            <Text style={EventModalStyles.textStyle}>Apply Filters</Text>
            </Pressable>
        </View>
        </View>
    </Modal>
  )
}
export default EventModal