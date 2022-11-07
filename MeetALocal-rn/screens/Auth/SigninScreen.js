import { View, Text, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AuthButton from '../../components/AuthButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signin } from '../../network/Auth';
const SigninScreen= ({ navigation })=> {
  const { user, setUser} = useContext(UserContext);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [invalidEmail, setInvalidEmail]= useState(false)
  const [invalidPassword, setInvalidPassword]= useState(false)
  const [isLoading, setIsLoading]=useState(false)
  const [loginFail, setLoginFail]=useState(false)
  const handleSubmit= async ()=>{
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
      const data = {
        email,
        password,};
      setIsLoading(true)
      const result =await signin(data)
      if (result.success){
        setUser(result.data.user)
        navigation.reset({
          index: 0,
          routes: [{ name: 'tabs' }],
        });
        navigation.navigate('tabs')
      }
      else{
        setIsLoading(false)
        setLoginFail(true)
        setTimeout(() => {
          setLoginFail(false);
        }, 1500);
      }
    }
  }
  console.log(user)
  return (
    <View style={styles.background}>
      <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
        <View style={[styles.formContainer, styles.shadowProp]}>
          <Text style={styles.signIn}>Sign In</Text>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput placeholder="placeholder" style={styles.input} onChangeText={setEmail} value={email}></TextInput>
            {invalidEmail?<Text style={styles.error}>Please enter a valid email</Text>:null}
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="placeholder" style={styles.input} onChangeText={setPassword} value={password}></TextInput>
            {invalidPassword?<Text style={styles.error}>Password must contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number</Text>:null}
          </View>
          {isLoading && <ActivityIndicator color="#8C57BA" />}
          {loginFail && <Text style={styles.error}>Failed to signIn</Text>}
          <AuthButton title={'Submit'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Dont have an account yet?
            <Text style={styles.link} onPress={() => navigation.navigate('signup-first')}>
                Create a new one
            </Text> 
          </Text>
        </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
  )
}
export default SigninScreen