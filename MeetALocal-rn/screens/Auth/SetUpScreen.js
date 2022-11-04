import { View, Text, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadImage from '../../components/UploadImage';
import * as Location from 'expo-location';

const SetUpScreen=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const route = useRoute();
  const type= route.params.type
  
  const [gender, setGender]=useState('')
  const [genderunset, setGenderUnset]=useState(false)
  const [base64, setBase64]=useState(null)
  const [ext, setext]=useState(null)
  const [about, setAbout]= useState(null)
  const handleSubmit=()=>{
    if(gender==''){
      setGenderUnset(true)
      setTimeout(() => {
        setGenderUnset(false);
      }, 1500);
    }
    else{
      setGenderUnset(false)
      if(type=='Foreigner'){
        setUp()
      }
      else if(type=='Local'){
        navigation.navigate('setup-map',{gender, base64, ext, about})
      }
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
      photo: base64,
      ext: ext
    };
    const token = await AsyncStorage.getItem('@token')
    axios({
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:"http://192.168.1.7:8000/api/v1.0.0/auth/setup",
    })
    .then(async (response)=> {
      await AsyncStorage.setItem("@user", JSON.stringify(response.data['user']));
      setUser(response.data.user)
      navigation.reset({
        index: 0,
        routes: [{ name: 'tabs' }],
      })
      navigation.navigate('tabs')
      return response.data;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }
  
  
  return (
    <View style={styles.background} >
        <Text style={styles.welcome}>Setup your account</Text>
        <View style={styles.picContainer}>
            <UploadImage setBase64={setBase64} setext={setext} />
        </View>
        <View style={styles.aboutContainer}>
          <Text>About <Text style={{fontSize:10, fontWeight:"300"}}>(max 200 characters)</Text></Text>
          <TextInput placeholder='Write something about your self' multiline={true} value={about} onChangeText={setAbout} style={styles.aboutInput} maxLength={20}></TextInput>
        </View>
        <Text style={styles.gender}>Gender *</Text>
        {genderunset?<Text style={styles.error}>Please select your gender</Text>:null}
        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={handleMale}><Image source={require('../../assets/male.png')} style={[styles.genderIcon, gender=='Male'?styles.selectedIcon:null]} /></TouchableOpacity>
          <TouchableOpacity onPress={handleFemale}><Image source={require('../../assets/female.png')} style={[styles.genderIcon, gender=='Female'?styles.selectedIcon:null]} /></TouchableOpacity>
        </View>
        
        <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
        
    </View>
  )
}
export default SetUpScreen