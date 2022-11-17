import { Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../constants/colors'
const Filters=({handleFilter})=>{
    return (
        <Pressable onPress={handleFilter}><Ionicons name="filter" size={25} color={colors.violet}/></Pressable>
        )
}
export default Filters