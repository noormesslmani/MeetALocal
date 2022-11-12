import { View, Text, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AuthButton from '../../components/AuthButton';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import UploadImage from '../../components/General/UploadImage';
import { setUpAccount } from '../../network/Auth';
import BackArrow from '../../components/Header/BackArrow';
const SetUpScreen=({navigation})=> {
const { user, setUser} = useContext(UserContext);
const route = useRoute();
const type= route.params.type
const [isLoading, setIsLoading]=useState(false)
const [gender, setGender]=useState('')
const [genderunset, setGenderUnset]=useState(false)
const [base64, setBase64]=useState(null)
const [ext, setext]=useState(null)
const [about, setAbout]= useState(null)
useEffect(() => {
  navigation.setOptions({
    headerLeft: () => <BackArrow navigation={navigation}/>,
  });
}, [navigation]);
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
      navigation.navigate('setup-map',{gender, base64, ext, about, type:2})
    }
  }
}
console.log(type)
const handleMale=()=>{
  setGender('Male')
}
const handleFemale=()=>{
  setGender('Female')
}
const setUp= async()=>{
  setIsLoading(true)
  const data = {
    type,
    gender,
    photo: base64,
    ext,
  };
  const result = await setUpAccount(data)
  if (result.success){
    await AsyncStorage.setItem("@user", JSON.stringify(response.data['user']));
    setUser(response.data.user)
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
    <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
      <Text style={styles.setUp}>Setup your account</Text>
      <View style={styles.picContainer}>
          <UploadImage setBase64={setBase64} setext={setext} />
      </View>
      <View style={styles.aboutContainer}>
        <Text>About <Text style={{fontSize:10, fontWeight:"300"}}>(max 200 characters)</Text></Text>
        <TextInput placeholder='Write something about yourself' multiline={true} value={about} onChangeText={setAbout} style={styles.aboutInput} maxLength={200}></TextInput>
      </View>
      <Text style={styles.gender}>Gender *</Text>
      {genderunset?<Text style={styles.error}>Please select your gender</Text>:null}
      <View style={styles.genderContainer}>
        <TouchableOpacity onPress={handleMale}><Image source={require('../../assets/male.png')} style={[styles.genderIcon, gender=='Male'?styles.selectedIcon:null]} /></TouchableOpacity>
        <TouchableOpacity onPress={handleFemale}><Image source={require('../../assets/female.png')} style={[styles.genderIcon, gender=='Female'?styles.selectedIcon:null]} /></TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator color="#8C57BA" />}
      <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
      </View>
      </KeyboardAwareScrollView>
  </View>
)
}
export default SetUpScreen