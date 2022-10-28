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
  const [submit, setSubmit]=useState(false);
  
  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>SignUp</Text>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setEmail} value={email}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setPassword} value={password}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Confirm Password</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword}></TextInput>
          </View>
          <AuthButton title={'Next'} setSubmit={setSubmit} ></AuthButton>
          <Text style={styles.text}>Already have an acount?
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
          </Text> 
        </View>
    </View>
  )
}

export default SignupScreen3