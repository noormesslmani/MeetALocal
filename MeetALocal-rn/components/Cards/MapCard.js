import { View, Text, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import React from 'react'
import { address } from '../../constants/address';
import MapCardStyle from './Styles/MapCardStyle';
import { widths } from '../../constants/dimensions';
const MapCard=({data, myList, navigation})=> {
  //cards displayed in a flatlist on the map 
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('local-page',{item})}>
          <View style={MapCardStyle.card_view} >
            <Image
              source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')}
              style={MapCardStyle.card_image}/>
            <View style={MapCardStyle.infoContainer}>
              <Text numberOfLines={1} style={MapCardStyle.title}>{item.name}</Text>
              <Text numberOfLines={1} style={MapCardStyle.country}>{item.country}</Text>
              <View style={MapCardStyle.card_inner_view}>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    return(
        <Animated.FlatList
            horizontal
            keyExtractor={item => item.id}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={[MapCardStyle.card_scroll_view, data.length==1?{left:0.25*widths.width}:null]}
            data={data}
            ref={myList}
            initialScrollIndex={0}
            renderItem={renderItem}
        >
        </Animated.FlatList>
    
    )
}
export default MapCard