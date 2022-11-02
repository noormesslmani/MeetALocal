import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MapStyles from './Styles/LocalsMapStyles';

const LocalsMap=({navigation})=> {
    const route = useRoute();
    const data= route.params.data

  return (

    <View style={MapStyles.mapContainer}>
            {
            <MapView
            style={MapStyles.map}
            loadingEnabled={true}
            region={{
                latitude:  0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}}>
                <Marker coordinate={{latitude: 0,
                longitude:0}}
                pinColor='red'
                draggable={true}
                onDragEnd={(e)=>{
                setLatitude( e.nativeEvent.coordinate.latitude)
                setLongitude( e.nativeEvent.coordinate.longitude)
                }}>
                </Marker>
            </MapView>}
    </View>
             
  )
}
export default LocalsMap