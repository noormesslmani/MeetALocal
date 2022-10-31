import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import LocalsStyles from './Styles/LocalsPageStyles';
import LocalCard from '../../components/Home/LocalsCard';
const Locals=({navigation})=> {
    const [viewFav, setViewFav]=useState(false)
    const { user, setUser} = useContext(UserContext);
    console.log(user.type_id)
  return (
    <View style={HomeStyles.container}>
        <Text style={LocalsStyles.title}>Locals</Text>
        <View style={LocalsStyles.view}>
            <TouchableOpacity onPress={()=>setViewFav(false)} >{user.type_id==2 && <Text style={[LocalsStyles.options,viewFav? null: LocalsStyles.selected ]}>View All</Text>}</TouchableOpacity>
            <TouchableOpacity onPress={()=>setViewFav(true)}>{user.type_id==2 && <Text style={[LocalsStyles.options, viewFav? LocalsStyles.selected: null]}>Favorites</Text>}</TouchableOpacity>
        </View>
        <View style={LocalsStyles.separator}/>
        <Text>Filter</Text>
        <LocalCard/>
              
        
    </View>
  )
}
export default Locals