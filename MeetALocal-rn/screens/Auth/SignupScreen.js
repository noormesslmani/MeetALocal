import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DatePicker from '../../components/General/datePicker';
import Icon from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SignupScreen = ({navigation}) => {
  const [fullName, setFullName]=useState('');
  const [invalidName, setInvalidName]=useState(false);
  const [phone, setPhone]=useState(0);
  const [invalidPhone, setInvalidPhone]=useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dob, setdob]=useState('')
  const [invalidDate, setinvalidDate] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  
  const handleDate= (event, value)=>{
    setDatePicker(false)
    setDate(value)
    setinvalidDate(false)
  }
  useEffect(()=>{
    setDateSelected(true)
    setdob(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
  },[date])
 
  const handleSubmit=()=>{
    setinvalidDate(false)
    setInvalidName(false)
    setInvalidPhone(false)
    if(fullName==''){
      setInvalidName(true)
      setTimeout(() => {
        setInvalidName(false);
      }, 1500);
    }
    else if(phone==0){
      setInvalidPhone(true)
      setTimeout(() => {
        setInvalidPhone(false);
      }, 1500);
    }
    else if(! dateSelected){
      setinvalidDate(true)
      setTimeout(() => {
        setinvalidDate(false);
      }, 1500);
    }
    else{
      navigation.navigate('signup-second', {
        fullName, phone, dob,
      })
    }
  }
  return (
    <View style={styles.background}>
      <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <Text>Full Name</Text>
            <TextInput placeholder="ex: Andrew Smith" style={styles.input} onChangeText={setFullName} value={fullName}></TextInput>
            {invalidName && <Text style={styles.error}>Please enter your name</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Phone Number</Text>
            <TextInput placeholder="ex: 0096171100200" style={styles.input} onChangeText={setPhone} value={phone} keyboardType={'numeric'}></TextInput>
            {invalidPhone && <Text style={styles.error}>Please enter your phone number</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Date of birth</Text>
            <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginTop:10}}><Icon name="calendar" size={30}/></TouchableOpacity>
            {invalidDate && <Text style={styles.error}>Please select the date of birth</Text>}
          </View>
          <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Already have an account? 
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
          </Text> 
          { datePicker && <DatePicker date={date} handleDate={handleDate} />}
            </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default SignupScreen