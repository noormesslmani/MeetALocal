import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './Styles/AuthScreensStyle';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AuthButton from '../../components/Buttons/AuthButton';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeesSlider from '../../components/General/Slider';
import { colors } from '../../constants/colors';
import { categoryIcons } from '../../constants/categories';
import { Avatar } from 'react-native-paper';
import { widths } from '../../constants/dimensions';
import WavyBack from '../../components/General/WavyBackground';
import { registerAccount } from '../../network/Auth';
const Categories=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const route = useRoute();
    const base64= route.params.base64
    const gender= route.params.gender
    const ext= route.params.ext
    const latitude=route.params.lat
    const longitude= route.params.lng
    const about= route.params.about
    const type= route.params.type
    const fullName= route.params.fullName
    const phone= route.params.phone
    const dob =route.params.dob
    const country= route.params.country
    const nationality =route.params.nationality
    const language = route.params.language
    const email= route.params.email
    const password= route.params.password
    const [categories, setCategories]=useState([])
    const [fees, setFees]=useState(0)
    const [isLoading, setIsLoading]= useState(false)
    const [limitExceeded, setLimitExceeded]=useState(false)
   
    useEffect(()=>{
        if(limitExceeded){
            setTimeout(() => {
                setLimitExceeded(false);
              }, 2000);
        }
    },[limitExceeded])
    const handleTourism=()=>{
        categories.includes("Tourism")?setCategories(arr => [...arr].filter(item => item !== "Tourism")):categories.length<3? setCategories(arr => [...arr, "Tourism"]):setLimitExceeded(true)
    }
    const handleCulture=()=>{
        categories.includes("Culture")?setCategories(arr => [...arr].filter(item => item !== "Culture")):categories.length<3?setCategories(arr => [...arr, "Culture"]):setLimitExceeded(true)
    }
    const handleGuidance=()=>{
        categories.includes("Guidance")?setCategories(arr => [...arr].filter(item => item !== "Guidance")):categories.length<3? setCategories(arr => [...arr, "Guidance"]):setLimitExceeded(true)
    }
    const handleLanguage=()=>{
        categories.includes("Language")?setCategories(arr => [...arr].filter(item => item !== "Language")):categories.length<3?setCategories(arr => [...arr, "Language"]):setLimitExceeded(true)
    }
    const handleEducation=()=>{
        categories.includes("Education")?setCategories(arr => [...arr].filter(item => item !== "Education")):categories.length<3?setCategories(arr => [...arr, "Education"]):setLimitExceeded(true)
    }
    const handleHistory=()=>{
        categories.includes("History")?setCategories(arr => [...arr].filter(item => item !== "History")):categories.length<3?setCategories(arr => [...arr, "History"]):setLimitExceeded(true)
    }
    const handleHousing=()=>{
        categories.includes("Housing")?setCategories(arr => [...arr].filter(item => item !== "Housing")):categories.length<3? setCategories(arr => [...arr, "Housing"]): setLimitExceeded(true)
    }
    const handleJobs=()=>{
        categories.includes("Jobs")?setCategories(arr => [...arr].filter(item => item !== "Jobs")):categories.length<3?setCategories(arr => [...arr, "Jobs"]): setLimitExceeded(true)
    }
    const handleOther=()=>{
        categories.includes("Other")?setCategories(arr => [...arr].filter(item => item !== "Other")):categories.length<3?setCategories(arr => [...arr, "Other"]): setLimitExceeded(true)
    }
    const handleSubmit=()=>{
        setUp()
    }
    const setUp= async()=>{
        setIsLoading(true)
        const data = {
            name:fullName,
            email,
            password,
            about,
            nationality,
            residence:country,
            date_of_birth:dob,
            languages:language,
            phone: parseInt(phone),
            type: 'Local',
            gender,
            photo: base64,
            ext,
            fees,
            categories,
            latitude,
            longitude,
          };
        const result = await registerAccount(data)
        if (result.success){
            await AsyncStorage.setItem("@user", JSON.stringify(result.data['user']));
            setUser(result.data.user)
            navigation.reset({
                index: 0,
                routes: [{ name: 'app' }],
          })
          navigation.navigate('app')
        }
        else{
          setIsLoading(false)
        }
      }
    return (
    <View style={[styles.background, {backgroundColor:'white'}]} >
        <WavyBack />
        <Text style={styles.selectCategory}>Select at least 1 category<Text style={{fontSize:10, color:colors.violet}}> (max 3)</Text></Text> 
        <View style={styles.categoryContainer}>
            <View style={styles.categoryRow}>
                <TouchableOpacity onPress={handleTourism} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Tourism")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Tourism']} style={styles.categoryIcon} />} />
                    <Text>Tourism</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleLanguage} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Language")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Language']} style={styles.categoryIcon} />} />
                    <Text>Language</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleHistory} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("History")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['History']} style={styles.categoryIcon} />} />
                    <Text>History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity onPress={handleHousing} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Housing")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Housing']} style={styles.categoryIcon} />} />
                    <Text>Housing</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleJobs} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Jobs")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Jobs']} style={styles.categoryIcon} />} />
                    <Text>Jobs</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleEducation} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Education")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Education']} style={styles.categoryIcon} />} />
                    <Text>Education</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity onPress={handleCulture} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Culture")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Culture']} style={styles.categoryIcon} />} />
                    <Text>Culture</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleGuidance} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Guidance")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Guidance']} style={styles.categoryIcon} />} />
                    <Text>Guidance</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleOther} style={styles.iconContainer}>
                    <Avatar.Icon size={0.15*widths.width} style={[styles.circle,categories.includes("Other")?styles.selectedIcon:null]} icon={()=><Image source={categoryIcons['Other']} style={styles.categoryIcon} />} />
                    <Text>Other</Text>
                </TouchableOpacity>
            </View>
            {limitExceeded && <Text style={styles.error} >You exceeded the maximum limit!</Text>}
        </View>
        
        <Text style={styles.selectCategory}>Fees per hour?</Text> 
        <Text style={styles.fees}>{fees && +fees} $/h</Text>
        <FeesSlider setFees={setFees}/>
         {isLoading && <ActivityIndicator color="#8C57BA" />}
         <View style={{position:"absolute", bottom:50}}>
        <AuthButton title={'Register'} handleSubmit={handleSubmit} type={3}></AuthButton>
        </View>
    </View>
  )
}
export default Categories