import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AuthButton from '../../components/AuthButton';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUpAccount } from '../../network/Auth';
import { categoryIcons } from '../../constants/categories';
import BackArrow from '../../components/Header/BackArrow';
const Categories=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const route = useRoute();
    const base64= route.params.base64
    const gender= route.params.gender
    const ext= route.params.ext
    const latitude=route.params.lat
    const longitude= route.params.lng
    const [categories, setCategories]=useState([])
    const [fees, setFees]=useState(0)
    const [isLoading, setIsLoading]= useState(false)
    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => <BackArrow navigation={navigation}/>,
        });
      }, [navigation]);
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
    const setUp= async()=>{
        setIsLoading(true)
        const data = {
            type: 'Local',
            gender,
            photo: base64,
            ext,
            fees,
            categories,
            latitude,
            longitude,
          };
        const result = await setUpAccount(data)
        if (result.success){
          await AsyncStorage.setItem("@user", JSON.stringify(result.data['user']));
          setUser(result.data.user)
          navigation.reset({
            index: 0,
            routes: [{ name: 'tabs' }],
          })
          navigation.navigate('tabs')
        }
        else{
          setIsLoading(false)
        }
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
         {isLoading && <ActivityIndicator color="#8C57BA" />}
        <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
    </View>
  )
}
export default Categories