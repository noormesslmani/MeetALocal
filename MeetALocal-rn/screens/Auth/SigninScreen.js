import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const SigninScreen= ({ navigation })=> {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [submit, setSubmit]=useState(false);
  console.log(submit)
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp]}>
          <Text style={styles.signIn}>Sign In</Text>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setEmail} value={email}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setPassword} value={password}></TextInput>
          </View>
          <AuthButton title={'Submit'} ></AuthButton>
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