import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
import Icon from 'react-native-vector-icons/Ionicons'

const Categories=({navigation})=> {
    const [categories, setCategories]=useState([])
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
    console.log(categories)
    return (
    <View style={styles.background} >
        <Text style={styles.selectCategory}>Select at least 1 category</Text> 
        <View style={styles.categoryContainer}>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleTourism}>
                    <Image source={require('../../assets/tourism.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Tourism")?styles.categoryLabel:null]}>Tourism</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleLanguage}>
                    <Image source={require('../../assets/languages.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Language")?styles.categoryLabel:null]}>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleHistory}>
                    <Image source={require('../../assets/history.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("History")?styles.categoryLabel:null]}>History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleHousing}>
                    <Image source={require('../../assets/house.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Housing")?styles.categoryLabel:null]}>Housing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleJobs}>
                    <Image source={require('../../assets/suitcase.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Jobs")?styles.categoryLabel:null]}>Jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleEducation}>
                    <Image source={require('../../assets/education.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Education")?styles.categoryLabel:null]}>Education</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleCulture}>
                    <Image source={require('../../assets/cultures.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Culture")?styles.categoryLabel:null]}>Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleGuidance}>
                    <Image source={require('../../assets/guidance.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Guidance")?styles.categoryLabel:null]}>Guidance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleOther}>
                    <Image source={require('../../assets/more.png')} style={styles.categoryIcon}/>
                    <Text style={[categories.includes("Other")?styles.categoryLabel:null]}>Other</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}
export default Categories