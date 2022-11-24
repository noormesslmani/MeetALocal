import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './Styles/AuthScreensStyle';
import { useState, useEffect } from "react";
import { TextInput, HelperText } from 'react-native-paper';
import AuthButton from '../../components/Buttons/AuthButton';
import BackArrow from '../../components/Header/BackArrow';
import Logo from '../../components/Header/Logo'
import { useRoute } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignupScreen3 = ({navigation}) => {
  const route = useRoute();
  const fullName= route.params.fullName
  const phone= route.params.phone
  const dob =route.params.dob
  const country= route.params.country
  const nationality =route.params.nationality
  const language = route.params.language
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const emailFormat=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passFormat= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackArrow navigation={navigation}/>,
      headerTitle: () => <Logo/>,
      });
  }, [navigation]);
  const handleNext=()=>{
    if(email.match(emailFormat) && password.match(passFormat) && confirmPassword==password ){
      navigation.navigate('user-type',{fullName,email,password,nationality,country,phone,dob,language})
    }
  }
 
  const emailHasErrors = () => {
    return !email.match(emailFormat) && !email==''
  };

  const passwordHasErrors = () => {
    return !password.match(passFormat) && !password==''
  };

  const confirmationHasErrors=()=>{
    return confirmPassword!=password && !confirmPassword=='' 
  }

  return (
    <View style={styles.background}>
      <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
            <Text style={styles.signIn}>Register</Text>
            <View style={styles.inputContainer}>
              <TextInput label="Email" style={styles.input} onChangeText={setEmail} value={email}
              left={<TextInput.Icon icon="email" />} underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}/>
                <HelperText type="error" visible={emailHasErrors()}>
                  Email address is invalid!
                </HelperText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput left={<TextInput.Icon icon="lock" />}
              secureTextEntry={true} label="Password" style={styles.input} onChangeText={setPassword} value={password}
              underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}/>
              <HelperText type="error" visible={passwordHasErrors()}>
                Invalid Password
              </HelperText>
    
            </View>
            <View style={styles.inputContainer}>
              <TextInput left={<TextInput.Icon icon="lock" />}
              secureTextEntry={true} label="Confirm password" style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword}
              underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}/>
              <HelperText type="error" visible={confirmationHasErrors()}>
                Passwords do not match!
              </HelperText>
            </View>
            <AuthButton title={'Next'} handleSubmit={handleNext} ></AuthButton>
            <Text style={styles.text}>Already have an account?
              </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                    Login
            </Text> 
            </View>
          </View>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default SignupScreen3