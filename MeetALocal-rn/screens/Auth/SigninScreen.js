import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseURL='http://127.0.0.1:8000/api/v1.0.0/';
const SigninScreen= ({ navigation })=> {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [invalidEmail, setInvalidEmail]= useState(false)
  const [invalidPassword, setInvalidPassword]= useState(false)
  const handleSubmit=()=>{
    setInvalidEmail(false)
    setInvalidPassword(false)
    if(! email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
      setInvalidEmail(true)
    }
    else if(! password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
      setInvalidPassword(true)
    }
    else{
      signin()
    }
  }
  
  function signin(){
    const data = {
      email: email,
      password: password,
    };
    axios({
      method: "post",
      data,
      url:"http://192.168.1.7:8000/api/v1.0.0/auth/login",
    })
    .then(async (response)=> {
      await AsyncStorage.setItem("@token", response.data['access_token']);
      if(response.data['user']['type_id']==2){
        navigation.navigate('foreigner-home')
      }
      return response.data;
    })
    .catch(function (error) {
      console.warn(error)
    });
  }
  
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp]}>
          <Text style={styles.signIn}>Sign In</Text>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setEmail} value={email}></TextInput>
            {invalidEmail?<Text style={styles.error}>Please enter a valid email</Text>:null}
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setPassword} value={password}></TextInput>
            {invalidPassword?<Text style={styles.error}>Password must contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number</Text>:null}
          </View>
          <AuthButton title={'Submit'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Dont have an account yet?
            <Text style={styles.link} onPress={() => navigation.navigate('signup-first')}>
                Create a new one
            </Text> 
          </Text>
        </View>
    </View>
  )
}
export default SigninScreen