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
  const [phone, setPhone]=useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleSubmit=()=>{
    console.log('submitted')
    navigation.navigate('signup-second')
  }
  const handleDate=(event, value)=>{
    // setDate(value);
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
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setFullName} value={fullName}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Phone Number</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setPhone} value={phone}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Date of birth</Text>
            <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginTop:10}}><Icon name="calendar" size={30}/></TouchableOpacity>
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