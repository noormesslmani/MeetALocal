import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import LocalCard from '../../components/Cards/LocalCard';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
const SearchScreen=({navigation})=> {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Searchbar placeholder="Search" style={{width:widths.width8}} />,
      headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  
  return (
      <View style={HomeStyles.container}>
        
        
      </View>
    )
}
 
export default SearchScreen