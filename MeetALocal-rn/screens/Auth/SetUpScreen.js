import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './Styles/AuthScreensStyle';
import { TextInput, Avatar } from 'react-native-paper';
import { useState, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import AuthButton from '../../components/Buttons/AuthButton';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UploadImage from '../../components/General/UploadImage';
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import WavyBack from '../../components/General/WavyBackground';
import { registerAccount } from '../../network/Auth';

const SetUpScreen=({navigation})=> {
const { user, setUser} = useContext(UserContext);
//route parameters
const route = useRoute();
const type= route.params.type;

const [isLoading, setIsLoading]=useState(false);

const [gender, setGender]=useState('');
const [genderUnset, setGenderUnset]=useState(false);
const [base64, setBase64]=useState(null);
const [ext, setext]=useState(null);
const [about, setAbout]= useState(null);

//check if gender is selected
//register for foreigner users, and continue for local users
const handleSubmit=()=>{
  if(gender==''){
    setGenderUnset(true);
    setTimeout(() => {
      setGenderUnset(false);
    }, 1500);
  }
  else{
    if(type=='Foreigner'){
      register();
    }
    else if(type=='Local'){
      navigation.navigate('setup-map',{...route.params,gender, base64, ext, about});
    }
  }
}

const handleMale=()=>{
  setGender('Male');
}
const handleFemale=()=>{
  setGender('Female');
}

//registering foreigner users
const register= async()=>{
  setIsLoading(true);
  const data = {
    name: route.params.fullName,
    email: route.params.email,
    password: route.params.password,
    nationality: route.params.nationality,
    residence: route.params.country,
    phone: parseInt(route.params.phone),
    date_of_birth: route.params.dob,
    languages: route.params.language,
    type,
    gender,
    photo: base64,
    ext,
  };
  const result = await registerAccount(data);
  if (result.success){
    await AsyncStorage.setItem("@user", JSON.stringify(result.data['user']));
    setUser(result.data.user);
    navigation.reset({
      index: 0,
      routes: [{ name: 'app' }],
    })
    navigation.navigate('app');
  }
  setIsLoading(false);
}

return (
  <View style={[styles.background,{backgroundColor:'white'}]} >
    <WavyBack/>
    <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
      <View style={styles.setUpContainer}>
        <View style={styles.picContainer}>
            <UploadImage setBase64={setBase64} setext={setext} />
        </View>
        <View style={styles.aboutContainer}>
          <Text>About <Text style={{fontSize:10, fontWeight:"300"}}>(max 255 characters)</Text></Text>
          <TextInput placeholder='Write about yourself' value={about} onChangeText={setAbout} style={styles.aboutInput} maxLength={255}
           outlineColor={colors.lightGrey} activeOutlineColor={colors.lighterViolet}
          mode='outlined' multiline={true} numberOfLines={5} />
        </View>
        <Text>Gender *</Text>
        {genderUnset?<Text style={styles.error}>Please select your gender</Text>:null}
        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={handleMale}><Avatar.Icon size={0.25*widths.width} style={[styles.genderAvatar, gender=='Male'?styles.selectedGender: null]} icon={()=><Image source={require('../../assets/male.png')} style={styles.genderIcon} />} /></TouchableOpacity>
          <TouchableOpacity onPress={handleFemale}><Avatar.Icon size={0.25*widths.width} style={[styles.genderAvatar, gender=='Female'?styles.selectedGender: null]} icon={()=><Image source={require('../../assets/female.png')} style={styles.genderIcon} />} /></TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator color={colors.violet} />}
        <View style={{position:"absolute", bottom:20}}>
        <AuthButton title={'Next'} handleSubmit={handleSubmit} type={3} ></AuthButton>
        </View>
      </View>
      </KeyboardAwareScrollView>
  </View>
)
}
export default SetUpScreen