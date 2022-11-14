import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalCardStyles from '../ComponentsStyles/LocalCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { categoryIcons } from '../../constants/categories';
import { address } from '../../constants/address';
import { Button} from 'react-native-paper';
import { colors } from '../../constants/colors';
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
            <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalCardStyles.image}/>
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
                <Button compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 12 }} style={LocalCardStyles.categoryBtn} icon={()=><Image source={categoryIcons[category]} style={{width:20, height:20}} />} mode="contained" >
                 {category}
                </Button>
                )}
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default LocalCard