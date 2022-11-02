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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
const MapModal=({navigation, modalVisible, setModalVisible, data})=> {

 
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
                <Text style={MapModalStyles.title}>Map View</Text>
                <MapView
                style={MapModalStyles.map}
                loadingEnabled={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                >
                {data.map((local) => (
                <Marker
                key={local.id}
                coordinate={{latitude: local.latitude, longitude: local.longitude}}
                pinColor='red'
                >
                <Callout style={{width:100, height:100}}>
                    <Text>Local</Text>
                </Callout>
                </Marker>
                ))}   
                </MapView>
            </View>
        </View>
    </Modal>
  )
}
export default MapModal