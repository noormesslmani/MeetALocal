import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { categoryIcons } from '../../constants/categories';
import { address } from '../../constants/address';
import { Button} from 'react-native-paper';
import { colors } from '../../constants/colors';
import LocalCardStyle from './Styles/LocalCardStyle';
const LocalCard=({navigation, item})=> {
    //cards that display locals (name, country, categories...)

    const [categories, setCategories]=useState([]);
    //local's categories
    useEffect(()=>{
        setCategories(item.categories);
    },[item])

    //navigate to local's profile page
    const handlePress=()=>{
        navigation.navigate('local-page', {item});
    }
  return (
    <View style={LocalCardStyle.container}>
        <TouchableOpacity style={LocalCardStyle.card} onPress={handlePress}>
            <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalCardStyle.image}/>
            <View style={LocalCardStyle.infoContainer}>
                <Text style={LocalCardStyle.name}>{item.name}</Text>
                <Text style={LocalCardStyle.country}>{item.country}</Text>
                <View style={LocalCardStyle.likesContainer}>
                    <Text style={{fontSize:14, marginRight:5}}>{item.likes}</Text>
                    <Icon name="heart" color="#8C57BA" size={15} /> 
                </View>   
            </View>
            <View style={LocalCardStyle.feesContainer}>
                <Text style={{fontSize:14, fontWeight:"900"}}>{item.fees}$/hr</Text>
            </View>
            <View style={LocalCardStyle.categoryContainer}>
                {categories.map((category,index)=>
                <Button key={index} compact uppercase={false} labelStyle={{ color: colors.violet, fontSize: 12 }} style={LocalCardStyle.categoryBtn} icon={()=><Image source={categoryIcons[category]} style={{width:20, height:20}} />} mode="contained" >
                 {category}
                </Button>
                )}
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default LocalCard