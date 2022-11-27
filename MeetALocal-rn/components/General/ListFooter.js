import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import ListFooterStyle from './Styles/ListFooterStyle';
const ListFooter=({isLoadingMore, isListEnd})=>{
    return (
    <View style={ListFooterStyle.contianer}>
      {isLoadingMore?<ActivityIndicator color={colors.lightViolet} />:null}
      {isListEnd?<Text style={ListFooterStyle.text}> You reached the end of the list</Text>:null}
    </View>
  )}
export default ListFooter