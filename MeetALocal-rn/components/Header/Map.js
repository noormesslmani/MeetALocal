import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../constants/colors'
const Map=({handleMap, small=false})=>{
    return (
        <Pressable onPress={handleMap} style={{marginLeft:10}}><Ionicons name="location-sharp" size={small?20:25} color={colors.violet}/></Pressable>
        )
}
export default Map