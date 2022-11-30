import { View, Text, } from 'react-native';
import React from 'react';
import styles from './Styles/AuthScreensStyle';
import { useState} from "react";
import { TextInput,} from 'react-native-paper';
import AuthButton from '../../components/Buttons/AuthButton';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { emailFormat, passFormat } from '../../constants/expressions';
const SignupScreen3 = ({navigation}) => {
  //route parameters
  const route = useRoute();
  
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');

  //validation
  const [invalidEmail, setInvalidEmail]= useState(false);
  const [invalidPassword, setInvalidPassword]= useState(false);
  const [unmatching, setUnmatching]= useState(false);
 
  const handleNext=()=>{
    if(! email.match(emailFormat) ){
      setInvalidEmail(true)
      setTimeout(() => {
        setInvalidEmail(false);
      }, 1500);
    }
    else if(! password.match(passFormat)){
      setInvalidPassword(true);
      setTimeout(() => {
        setInvalidPassword(false);
      }, 1500);
    }
    else if( confirmPassword!=password){
      setUnmatching(true);
      setTimeout(() => {
        setUnmatching(false);
      }, 1500);
    }
    else
    {
      navigation.navigate('user-type',{...route.params,email,password})
    }
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
              {invalidEmail?<Text style={styles.error}>Please enter a valid email</Text>:null}
            </View>
            <View style={styles.inputContainer}>
              <TextInput left={<TextInput.Icon icon="lock" />}
              secureTextEntry={true} label="Password" style={styles.input} onChangeText={setPassword} value={password}
              underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}/>
              {invalidPassword?<Text style={styles.error}>Password must be have atleast 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number</Text>:null}
    
            </View>
            <View style={styles.inputContainer}>
              <TextInput left={<TextInput.Icon icon="lock" />}
              secureTextEntry={true} label="Confirm password" style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword}
              underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}/>
              {unmatching?<Text style={styles.error}>Passwords do not match!</Text>:null}
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