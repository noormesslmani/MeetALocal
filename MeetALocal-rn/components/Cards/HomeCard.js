import { View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeCardStyle from './Styles/HomeCardStyle';
const HomeCard=({label, handlePress})=> {
    const [icon, setIcon]=useState('');
    useEffect(()=>{
        if(label=='Locals'){
            setIcon('user');
        }
        else if(label=='Events'){
            setIcon('calendar');
        }
        else{
            setIcon('comment-alt');
        }
    },[])
  return (
    <View style={HomeCardStyle.cardContainer}>
        <TouchableOpacity style={[HomeCardStyle.card]} onPress={handlePress} >
            <View style={HomeCardStyle.cardItems}>
                <Text style={HomeCardStyle.label}>{label}</Text>
                <Icon name={icon} size={50} color="white"/>
            </View>
        </TouchableOpacity>
    </View>
  )
}
export default HomeCard