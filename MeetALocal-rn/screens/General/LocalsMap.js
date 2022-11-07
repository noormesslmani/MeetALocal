import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import LocalsMapStyles from './Styles/LocalMapsStyles';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../App'

const LocalsMap=({navigation})=> {
    const { user, setUser, locals, setLocals} = useContext(UserContext);
  return (
            <View style={LocalsMapStyles.modalView}>
                <MapView
                style={LocalsMapStyles.map}
                loadingEnabled={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                >
                {locals.map((local) => (
                <Marker
                key={local.id}
                coordinate={{latitude: local.latitude, longitude: local.longitude}}
                pinColor='red'
                >
                <Callout style={{width:80, height:"auto"}}>
                    <Text style={{fontSize:7}}> <Text style={{fontWeight:"600"}}>Name:</Text> {local.name}</Text>
                    <Text style={{fontSize:7}}> <Text style={{fontWeight:"600"}}>Gender:</Text> {local.gender}</Text>
                    <Text style={{fontSize:7}}> <Text style={{fontWeight:"600"}}>About:</Text> {local.about}</Text>
                </Callout>
                </Marker>
                ))}   
                </MapView>
            </View>
  )
}
export default LocalsMap