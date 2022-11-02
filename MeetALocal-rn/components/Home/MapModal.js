import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import MapModalStyles from '../ComponentsStyles/MapModalStyles';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
const MapModal=({navigation, modalVisible, setModalVisible, data})=> {
    useEffect(()=>{
        if(modalVisible){
            console.log(data[0].longitude)
        }
    },[modalVisible])
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={MapModalStyles.centeredView}>
            <View style={MapModalStyles.modalView}>
                <Text>Map</Text>
                <MapView
                style={MapModalStyles.map}
                loadingEnabled={true}
                region={{
                latitude:  0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}}>
                {data.map((local) => (
                <Marker
                key={local.id}
                coordinate={{latitude: local.latitude, longitude: local.longitude}}
                title='local'
                description='local'
                pinColor='red'
                />
                ))}   
                </MapView>
            </View>
        </View>
    </Modal>
  )
}
export default MapModal