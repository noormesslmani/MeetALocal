import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import EmptyPageStyle from './Styles/EmptyPageStyle'
const EmptyPage=()=>{
    return(
    <View style={EmptyPageStyle.container}>
        <FontAwesome5 name='sad-tear' size={150} color={colors.lightViolet} /> 
        <Text style={EmptyPageStyle.text}>Nothing to show here</Text>
    </View>
    )
}
export default EmptyPage