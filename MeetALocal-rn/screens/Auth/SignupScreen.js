import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const SignupScreen = ({navigation}) => {
  const [fullName, setFullName]=useState('');
  const [phone, setPhone]=useState('');
  const [gender, setGender]=useState('');
  const [next, setNext]=useState(false);
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp]}>
          <Text style={styles.signIn}>SignUp</Text>
          <View style={styles.inputContainer}>
            <Text>Full Name</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setFullName} value={fullName}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Phone Number</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setPhone} value={phone}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Gender</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setGender} value={gender}></TextInput>
          </View>
          <AuthButton title={'Next'} ></AuthButton>
          <Text style={styles.text}>Already have an acoount?
            <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
            </Text> 
          </Text>
        </View>
    </View>
  )
}

export default SignupScreen