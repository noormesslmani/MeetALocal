import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
const LocalPage=({navigation})=> {
    const route = useRoute();
    const { user, setUser} = useContext(UserContext);
    const item =route.params.item
  return (
    <View>
        <Text>{item.id}</Text>
    </View>
    
  )
}
export default LocalPage