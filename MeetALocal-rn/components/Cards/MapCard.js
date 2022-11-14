import { View, Text, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { address } from '../../constants/address';
import { Surface } from 'react-native-paper';
import MapCardStyles from '../ComponentsStyles/MapCardStyles';
const MapCard=({data, myList, navigation})=> {
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('local-page',{item})}
            >
              <View style={MapCardStyles.card_view} >
                <Image
                  source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')}
              
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
        <Animated.FlatList
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
        </Animated.FlatList>
    
    )
}
export default MapCard