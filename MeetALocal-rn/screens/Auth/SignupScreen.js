import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign'
const SignupScreen = ({navigation}) => {
  const [fullName, setFullName]=useState('');
  const [invalidName, setInvalidName]=useState(false);
  const [phone, setPhone]=useState(0);
  const [invalidPhone, setInvalidPhone]=useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [invalidDate, setinvalidDate] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const handleSubmit=()=>{
    setinvalidDate(false)
    setInvalidName(false)
    setInvalidPhone(false)
    if(fullName==''){
      setInvalidName(true)
    }
    else if(phone==0){
      setInvalidPhone(true)
    }
    else if(! dateSelected){
      setinvalidDate(true)
    }
    else{
      console.log('submitted')
      navigation.navigate('signup-second', {
        fullName, phone, date,
      });
    }
  }
  const handleDate=(event, value)=>{
    setDate(value);
    setinvalidDate(false)
    setDateSelected(true)
    setDatePicker(false); 
  }
  // console.log(date.getFullYear())
  // console.log(date.getMonth())
  // console.log(date.getDate())
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <Text>Full Name</Text>
            <TextInput placeholder="Andrew Smith" style={styles.input} onChangeText={setFullName} value={fullName}></TextInput>
            {invalidName && <Text style={styles.error}>Please enter your name</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Phone Number</Text>
            <TextInput placeholder="0096171100200" style={styles.input} onChangeText={setPhone} value={phone} keyboardType={'numeric'}></TextInput>
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
          { datePicker && <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={handleDate}
            maximumDate={new Date(2022, 1, 1)}
          />}
        </View>
    </View>
  )
}

export default SignupScreen