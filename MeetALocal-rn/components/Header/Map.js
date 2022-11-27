import {  Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
const Map=({handleMap, small=false})=>{
    return (
        <Pressable onPress={handleMap} style={small?{marginLeft:5}:{marginLeft:10}}><Ionicons name="location-sharp" size={small?18:25} color={small?colors.mediumViolet:colors.violet}/></Pressable>
        )
}
export default Map