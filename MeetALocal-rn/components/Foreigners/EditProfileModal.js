import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../App'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import EditModalStyles from '../ComponentsStyles/EditModalstyles';
import { ScrollView } from 'react-native-gesture-handler';
const EditModal=({modalVisible, setModalVisible})=> {
  
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={EditModalStyles.centeredView}>
          <View style={EditModalStyles.modalView}>
            <ScrollView>
                
            </ScrollView>
          </View>
        </View>
    </Modal>
  )
}
export default EditModal