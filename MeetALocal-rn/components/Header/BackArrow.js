import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../constants/colors'
const BackArrow=({navigation})=>{
    return (<Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={30} color={colors.violet}/></Pressable>)
}
export default BackArrow