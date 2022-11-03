import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalStyles from '../ComponentsStyles/FilterModalStyles';
import ImageModalStyles from '../ComponentsStyles/ImageModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
const ImageModal=({modalVisible, setModalVisible})=> {
    
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={ImageModalStyles.centeredView}>
        <View style={ImageModalStyles.modalView}>
            
        </View>
        </View>
    </Modal>
  )
}
export default ImageModal