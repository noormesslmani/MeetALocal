import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalCardStyles from '../ComponentsStyles/LocalCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { categoryIcons } from '../../constants/categories';
const LocalCard=({navigation, item})=> {
    
    const [categories, setCategories]=useState([])
    useEffect(()=>{
        setCategories(item.categories)
    },[item])
    const handlePress=()=>{
        console.log(item)
        navigation.navigate('local-page', {item});
    }
  return (
    <View style={LocalCardStyles.container}>
        <TouchableOpacity style={LocalCardStyles.card} onPress={handlePress}>
            <Image source={item.profile_picture?{ uri:`http://192.168.1.7:8000/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalCardStyles.image}/>
            <View style={LocalCardStyles.infoContainer}>
                <Text style={LocalCardStyles.name}>{item.name}</Text>
                <Text style={LocalCardStyles.country}>{item.country}</Text>
                <View style={LocalCardStyles.likesContainer}>
                    <Text style={{fontSize:14, marginRight:5}}>{item.likes}</Text>
                    <Icon name="heart" color="#8C57BA" size={15} /> 
                </View>   
            </View>
            <View style={LocalCardStyles.feesContainer}>
                <Text style={{fontSize:14, fontWeight:"900"}}>{item.fees}$/hr</Text>
            </View>
            <View style={LocalCardStyles.categoryContainer}>
                {categories.map((category)=>
                <View style={LocalCardStyles.CategorySubcontainer}>
                    <Image source={categoryIcons[category]} style={{width:30, height:30}} />
                    <Text style={LocalCardStyles.iconLabel}>{category}</Text>
                </View>
                )}
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default LocalCard