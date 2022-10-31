import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import EventsStyles from './Styles/EventsPageStyles';
import FilterModal from '../../components/Home/FilterModal';
const Events=({navigation})=> {
  const [viewSaved, setViewSaved]=useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');
  return (
    <View style={HomeStyles.container}>
        <Text style={EventsStyles.title}>Events</Text>
        <View style={EventsStyles.view}>
            <TouchableOpacity onPress={()=>setViewSaved(false)} >{ <Text style={[EventsStyles.options,viewSaved? null: EventsStyles.selected ]}>View All</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewSaved(true)}>{ <Text style={[EventsStyles.options, viewSaved? EventsStyles.selected: null]}>Saved</Text>}</TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{setModalVisible(true)}}><Text style={{color:'grey', marginBottom:5}}>Filter</Text></TouchableOpacity>
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory}/>
        <View style={EventsStyles.separator}/>
        <SafeAreaView>
          {/* <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={LocalsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
          /> */}
        </SafeAreaView>
      </View>
  )
}
export default Events