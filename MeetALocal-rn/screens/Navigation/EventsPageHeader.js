import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer, useNavigation} from '@react-navigation/native';

const EventsHeader= ()=> {
    const navigation= useNavigation()
    return (
        <View style={[styles.headerContainer,styles.halfWidth]} >
            <Pressable onPress={() => navigation.goBack()}><Icon name="chevron-back" size={30} color="#8C57BA"/></Pressable>
            <Text style={{fontSize:26, color: "#8C57BA"}}>Events</Text>   
        </View>

    )
  }
  export default EventsHeader