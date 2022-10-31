import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalStyles from '../ComponentsStyles/FilterModalStyles';
const FilterModal=({navigation, modalVisible, setModalVisible})=> {
    
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={ModalStyles.centeredView}>
        <View style={ModalStyles.modalView}>
            <Text style={ModalStyles.modalText}>Hello World!</Text>
            <Pressable
            style={ModalStyles.button}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={ModalStyles.textStyle}>Hide Modal</Text>
            </Pressable>
        </View>
        </View>
    </Modal>
  )
}
export default FilterModal