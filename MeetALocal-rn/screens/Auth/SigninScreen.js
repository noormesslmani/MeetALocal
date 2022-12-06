import { View, Text, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';
import styles from './Styles/AuthScreensStyle';
import { useState,  useContext } from "react";
import { UserContext } from '../../context/UserContext';
import AuthButton from '../../components/Buttons/AuthButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../constants/colors';
import { signin } from '../../network/Auth';
import { emailFormat } from '../../constants/expressions';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
const SigninScreen= ({ navigation })=> {
  const { user, setUser} = useContext(UserContext);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [invalidEmail, setInvalidEmail]= useState(false);
  
  const [isLoading, setIsLoading]=useState(false);
  const [loginFail, setLoginFail]=useState(false);

  //Validate email first
  const handleSubmit= async ()=>{
    if(! email.match(emailFormat)){
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
     }, 1500);
    }
    else{
      setIsLoading(true);
      const result =await signin({email, password,});
      if (result.success){
        setUser(result.data.user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'app' }],
        });
        navigation.navigate('app');
      }
      else if(result.error.response.data.message=='Unauthorized'){
        showMessage({
          message: "Invalid Email/password",
          type: "fail",
        });
      }
      else if(result.error.response.data.message=='account banned'){
        showMessage({
          message: "Account is banned!",
          type: "fail",
        });
      }
      setIsLoading(false)
    }
  }
 
  return (
    <View style={styles.background}>
      <FlashMessage position="top" />
      <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
        <View style={[styles.formContainer, styles.shadowProp]}>
          <Text style={styles.signIn}>Sign In</Text>
          <View style={styles.inputContainer}>
            <TextInput label='Email' style={styles.input} onChangeText={setEmail} value={email}
            left={<TextInput.Icon icon="email" />} underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet} ></TextInput>
            {invalidEmail?<Text style={styles.error}>Please enter a valid email</Text>:null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput label='Password' left={<TextInput.Icon icon="lock" />}
            secureTextEntry={true}  style={styles.input} onChangeText={setPassword} value={password}
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
