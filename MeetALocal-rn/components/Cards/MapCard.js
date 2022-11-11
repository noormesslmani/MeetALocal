import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import MapCardStyles from '../ComponentsStyles/MapCardStyles';
const MapCard=({data, myList})=> {
    const renderItem = ({ item, index }) => (
        <TouchableOpacity 
            >
              <View style={MapCardStyles.card_view} >
                <Image
                  source={item.profile_picture?{ uri:`http://192.168.1.7:8000/${item.profile_picture}`}: require('../../assets/blank-profile.webp')}
              
                  style={MapCardStyles.card_image}
                />
                <View style={{flex:2,padding:10}}>
                  <Text numberOfLines={1} style={MapCardStyles.title}>{item.name}</Text>
                  <Text numberOfLines={1} style={MapCardStyles.country}>{item.country}</Text>
                  <View style={MapCardStyles.card_inner_view}>
                  </View>
                </View>
              </View>
          </TouchableOpacity>
      );
    return(
        <FlatList
            horizontal
            keyExtractor={item => item.id.toString()}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={MapCardStyles.card_scroll_view}
            data={data}
            ref={myList}
            initialScrollIndex={0}
            renderItem={renderItem}
        >
        </FlatList>
    )
}
export default MapCard