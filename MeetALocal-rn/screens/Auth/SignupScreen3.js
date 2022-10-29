import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignupScreen3 = ({navigation}) => {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState([]);
  const [invalidEmail, setInvalidEmail]= useState(false)
  const [invalidPassword, setInvalidPassword]= useState(false)
  const [unmatchedPassword, setUnmatchedPassword]= useState(false)
  const handleSubmit=()=>{
    setInvalidEmail(false)
    setInvalidPassword(false)
    setUnmatchedPassword(false)
    if(! email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
      setInvalidEmail(true)
    }
    else if(! password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
      setInvalidPassword(true)
    }
    else if(password!=confirmPassword){
      setUnmatchedPassword(true)
    }
    else{
      navigation.navigate('user-type')
    }
  }
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setEmail} value={email}></TextInput>
            {invalidEmail && <Text style={styles.error}>Please enter a valid email</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setPassword} value={password}></TextInput>
            {invalidPassword && <Text style={styles.error}>Password must contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Confirm Password</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword}></TextInput>
            {unmatchedPassword && <Text style={styles.error}>Passwords do not match!</Text>}
          </View>
          <AuthButton title={'Register'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Already have an account?
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
          </Text> 
        </View>
    </View>
  )
}

export default SignupScreen3