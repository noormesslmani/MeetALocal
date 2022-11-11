import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import ListFooterStyles from '../ComponentsStyles/ListFooterStyles'
const ListFooter=({isLoadingMore, isListEnd})=>{
    return (
    <View style={ListFooterStyles.contianer}>
      {isLoadingMore?<ActivityIndicator color={colors.lightViolet} />:null}
      {isListEnd?<Text> You reached the end of the list</Text>:null}
    </View>
  )}
export default ListFooter