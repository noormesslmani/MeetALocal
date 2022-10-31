import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalCardStyles from '../ComponentsStyles/LocalCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
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
                    setIcons((icons)=>[...icons, tourism])
                  break;
                case 'Language':
                    setIcons((icons)=>[...icons, languages])
                  break;
                case 'Culture':
                setIcons((icons)=>[...icons, cultures])
                    break;
                case 'History':
                    setIcons((icons)=>[...icons, history])
                    break;
                case 'Education':
                    setIcons((icons)=>[...icons, education])
                    break;
                case 'Jobs':
                    setIcons((icons)=>[...icons, jobs])
                    break;
                case 'Housing':
                    setIcons((icons)=>[...icons, house])
                break;
                case 'Guidance':
                    setIcons((icons)=>[...icons, guidance])
                break;
            }
        }
    },[categories])
    
  return (
    
    <TouchableOpacity style={LocalCardStyles.card}>
        <Image source={require('../../assets/profile.jpg')} style={LocalCardStyles.image}/>
        <View style={LocalCardStyles.infoContainer}>
            <Text style={LocalCardStyles.name}>{item.name}</Text>
            <Text style={LocalCardStyles.country}>{item.country}</Text>
            <Text style={LocalCardStyles.likes}>Likes</Text>
        </View>
        <View style={LocalCardStyles.fees}>
                <Text style={{fontSize:12, fontWeight:"900"}}>{item.fees}$/hr</Text>
        </View>
        <View style={LocalCardStyles.categoryContainer}>
            <View style={{alignItems:"center", flexDirection:"row"}}>

                {icons.map((icon)=><Image source={icon} style={{width:35, height:35, margin:15}} />)}
            </View>
        </View>
    </TouchableOpacity>
  )
}
export default LocalCard