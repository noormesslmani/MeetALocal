import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignupScreen2 = ({navigation}) => {
  const [nationality, setNationality]=useState('');
  const [country, setCountry]=useState('');
  const [languages, setLanguages]=useState([]);
  
  const handleSubmit=()=>{
    console.log('submitted')
    navigation.navigate('signup-third')
  }
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <Text>Nationality</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setNationality} value={nationality}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Country of Residence</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setCountry} value={country}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Languages</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setLanguages} value={languages}></TextInput>
          </View>
          <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Already have an account?
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
          </Text> 
        </View>
    </View>
  )
}

export default SignupScreen2