import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const SetUpScreen=({navigation})=> {
  const route = useRoute();
  const type= route.params.type
  const [gender, setGender]=useState('')
  const [genderunset, setGenderUnset]=useState(false)

  const handleSubmit=()=>{
    if(gender==''){
      setGenderUnset(true)
    }
    else{
      setGenderUnset(false)
      if(type=='Foreigner'){
        setUp()
      }
      else{navigation.navigate('categories')}
    }
  }
  const handleMale=()=>{
    setGender('Male')
  }
  const handleFemale=()=>{
    setGender('Female')
  }
  async function setUp(){
    const data = {
      type: type,
      gender: gender,
    };
    console.log(data)
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:"http://192.168.1.7:8000/api/v1.0.0/auth/setup",
    })
    .then(async (response)=> {
      await AsyncStorage.setItem("@user", JSON.stringify(response.data['user']));
      // const user = await AsyncStorage.getItem('@user')
      // console.log(user)
      return response.data;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }
  return (
    <View style={styles.background} >
        <Text style={styles.welcome}>Welcome</Text>
        <View style={styles.picContainer}>
            <Image source={require('../../assets/blank-profile.webp')} style={styles.profilePic} />
            <Icon name="add-circle" style={styles.addIcon} size={35}/>
        </View>
        <Text style={styles.gender}>Location</Text>
        <Icon name="location-sharp"  size={30}/>
        <Text style={styles.gender}>Gender</Text>
        {genderunset?<Text style={styles.error}>Please select you gender</Text>:null}
        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={handleMale}><Image source={require('../../assets/male.png')} style={[styles.genderIcon, gender=='Male'?styles.selectedIcon:null]} /></TouchableOpacity>
          <TouchableOpacity onPress={handleFemale}><Image source={require('../../assets/female.png')} style={[styles.genderIcon, gender=='Female'?styles.selectedIcon:null]} /></TouchableOpacity>
        </View>
        <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
        
    </View>
  )
}
export default SetUpScreen