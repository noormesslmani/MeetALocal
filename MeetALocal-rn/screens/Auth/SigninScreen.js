import { View, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import AuthButton from '../../components/AuthButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../constants/colors';
import { signin } from '../../network/Auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const SigninScreen= ({ navigation })=> {
  const { user, setUser} = useContext(UserContext);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [invalidEmail, setInvalidEmail]= useState(false)
  const [isLoading, setIsLoading]=useState(false)
  const [loginFail, setLoginFail]=useState(false)
  const handleSubmit= async ()=>{
    setInvalidEmail(false)
    if(! email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
      setInvalidEmail(true)
    }
    else{
      const data = {
        email,
        password,};
        console.log(data)
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
            <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email}
            left={<TextInput.Icon icon="email" />} underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet} ></TextInput>
            {invalidEmail?<Text style={styles.error}>Please enter a valid email</Text>:null}
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput left={<TextInput.Icon icon="lock" />}
            secureTextEntry={true} placeholder="Password" style={styles.input} onChangeText={setPassword} value={password}
            underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}></TextInput>
          </View>
          {isLoading && <ActivityIndicator color={colors.violet} />}
          {loginFail && <Text style={styles.error}>Failed to signIn</Text>}
          <AuthButton title={'Submit'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Dont have an account yet?</Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signup-first')}>
                Create a new one
            </Text> 
        </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
  )
}
export default SigninScreen