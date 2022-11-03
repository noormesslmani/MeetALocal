import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
import Icon from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Categories=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const route = useRoute();
    const base64= route.params.base64
    const gender= route.params.gender
    const ext= route.params.ext
    const latitude=route.params.latitude
    const longitude= route.params.longitude
    const [categories, setCategories]=useState([])
    const [fees, setFees]=useState(0)
    const handleTourism=()=>{
        categories.includes("Tourism")?setCategories(arr => [...arr].filter(item => item !== "Tourism")):setCategories(arr => [...arr, "Tourism"])
    }
    const handleCulture=()=>{
        categories.includes("Culture")?setCategories(arr => [...arr].filter(item => item !== "Culture")):setCategories(arr => [...arr, "Culture"])
    }
    const handleGuidance=()=>{
        categories.includes("Guidance")?setCategories(arr => [...arr].filter(item => item !== "Guidance")):setCategories(arr => [...arr, "Guidance"])
    }
    const handleLanguage=()=>{
        categories.includes("Language")?setCategories(arr => [...arr].filter(item => item !== "Language")):setCategories(arr => [...arr, "Language"])
    }
    const handleEducation=()=>{
        categories.includes("Education")?setCategories(arr => [...arr].filter(item => item !== "Education")):setCategories(arr => [...arr, "Education"])
    }
    const handleHistory=()=>{
        categories.includes("History")?setCategories(arr => [...arr].filter(item => item !== "History")):setCategories(arr => [...arr, "History"])
    }
    const handleHousing=()=>{
        categories.includes("Housing")?setCategories(arr => [...arr].filter(item => item !== "Housing")):setCategories(arr => [...arr, "Housing"])
    }
    const handleJobs=()=>{
        categories.includes("Jobs")?setCategories(arr => [...arr].filter(item => item !== "Jobs")):setCategories(arr => [...arr, "Jobs"])
    }
    const handleOther=()=>{
        categories.includes("Other")?setCategories(arr => [...arr].filter(item => item !== "Other")):setCategories(arr => [...arr, "Other"])
    }
    const handleSubmit=()=>{
        setUp()
    }

    async function setUp(){
        const data = {
          type: 'Local',
          gender: gender,
          photo: base64,
          ext: ext,
          fees: fees,
          categories: categories,
          latitude:latitude,
          longitude:longitude
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
          navigation.navigate('tabs')
          return response.data;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
    
    return (
    <View style={styles.background} >
        <Text style={styles.selectCategory}>Select at least 1 category</Text> 
        <View style={styles.categoryContainer}>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleTourism}>
                    <View style={styles.circle}>
                        <Image source={require('../../assets/tourism.png')} style={styles.categoryIcon}/>
                    </View>
                    <Text style={[categories.includes("Tourism")?styles.categoryLabel:null]}>Tourism</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleLanguage}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/languages.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Language")?styles.categoryLabel:null]}>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleHistory}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/history.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("History")?styles.categoryLabel:null]}>History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleHousing}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/house.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Housing")?styles.categoryLabel:null]}>Housing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleJobs}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/suitcase.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Jobs")?styles.categoryLabel:null]}>Jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleEducation}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/education.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Education")?styles.categoryLabel:null]}>Education</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleCulture}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/cultures.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Culture")?styles.categoryLabel:null]}>Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleGuidance}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/guidance.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Guidance")?styles.categoryLabel:null]}>Guidance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleOther}>
                <View style={styles.circle}>
                    <Image source={require('../../assets/more.png')} style={styles.categoryIcon}/>
                </View>
                    <Text style={[categories.includes("Other")?styles.categoryLabel:null]}>Other</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <Text style={styles.selectCategory}>Fees per hour?</Text> 
        <Text style={styles.fees}>{fees && +fees} $/h</Text>
        <Slider
            step={1}
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            thumbTintColor='rgba(75, 176, 249, 0.75)'
            onValueChange={setFees}
        />
        <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
    </View>
  )
}
export default Categories