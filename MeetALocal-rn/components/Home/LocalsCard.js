import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalCardStyles from '../ComponentsStyles/LocalCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import Tourism from '../../assets/tourism.png'
import Culture from '../../assets/cultures.png'
import Education from '../../assets/education.png'
import Guidance from '../../assets/guidance.png'
import History from '../../assets/history.png'
import Housing from '../../assets/house.png'
import Language from '../../assets/languages.png'
import Other from '../../assets/more.png'
import Jobs from '../../assets/suitcase.png'

const LocalCard=({navigation, item})=> {
 
    const [categories, setCategories]=useState([])
    const [icons, setIcons]=useState([])
    useEffect(()=>{
        setIcons([])
        setCategories(item.categories)
    },[])
    useEffect(()=>{
        for(let category of categories){
            switch(category) {
                case 'Tourism':
                    setIcons((icons)=>[...icons, [Tourism,'Tourism']])
                  break;
                case 'Language':
                    setIcons((icons)=>[...icons, [Language,'Language']])
                  break;
                case 'Culture':
                setIcons((icons)=>[...icons, [Culture,'Culture']])
                    break;
                case 'History':
                    setIcons((icons)=>[...icons, [History, 'History']])
                    break;
                case 'Education':
                    setIcons((icons)=>[...icons, [Education, 'Education']])
                    break;
                case 'Jobs':
                    setIcons((icons)=>[...icons, [Jobs, 'Jobs']])
                    break;
                case 'Housing':
                    setIcons((icons)=>[...icons, [Housing, 'Housing']])
                break;
                case 'Guidance':
                    setIcons((icons)=>[...icons, [Guidance, 'Guidance']])
                break;
            }
        }
    },[categories])
  return (
    <View style={LocalCardStyles.container}>
        <TouchableOpacity style={LocalCardStyles.card}>
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
                {icons.map((icon)=>
                <View style={LocalCardStyles.CategorySubcontainer}>
                    <Image source={icon[0]} style={{width:30, height:30}} />
                    <Text style={LocalCardStyles.iconLabel}>{icon[1]}</Text>
                </View>
                )}
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default LocalCard