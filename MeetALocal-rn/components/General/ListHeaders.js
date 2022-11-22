import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import ListHeaderStyle from './Styles/ListHeaderStyle'
const ListHeader=({country, category})=>{
    return (
        <View style={ListHeaderStyle.iconsContainer}>
        <View style={ListHeaderStyle.filters}>
          <Ionicons name='earth' size={25} color={colors.mediumViolet}/>
          <Text style={ListHeaderStyle.filterText} >{country=='all'?'All countries':country}</Text>
        </View>
        <View style={ListHeaderStyle.filters}>
          <MaterialIcons name='category'  size={25} color={colors.mediumViolet} />
          <Text style={ListHeaderStyle.filterText}>{category=='all'?'All categories':category}</Text>
        </View>
      </View>
  )}
export default ListHeader