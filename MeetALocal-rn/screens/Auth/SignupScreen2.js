import { View, Text, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import styles from './Styles/AuthScreensStyle';
import { useState } from "react";
import AuthButton from '../../components/Buttons/AuthButton';
import { useRoute } from '@react-navigation/native';
import LanguagePicker from '../../components/General/LanguagePicker';
import CountryPicker from '../../components/General/CountryPicker';
const SignupScreen2 = ({navigation}) => {
  //route parameters
  const route = useRoute();
  const fullName= route.params.fullName;
  const phone= route.params.phone;
  const dob =route.params.dob;
  
  const [nationality, setNationality]=useState(null);
  const [country, setCountry]=useState(null);
  const [language, setLanguage]=useState([]);

  //validation
  const [invalidCountry, setInvalidCountry]=useState(false);
  const [invalidNationality, setInvalidNationality]=useState(false);
  const [invalidlanguage, setInvalidLanguage]=useState(false);
  //pickers
  const [openNationality, setOpenNationality] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  
  const handleSubmit=()=>{
    if(! nationality){
      setInvalidNationality(true);
      setTimeout(() => {
        setInvalidNationality(false);
      }, 1500);
    }
    else if(! country){
      setInvalidCountry(true);
      setTimeout(() => {
        setInvalidCountry(false);
      }, 1500);
    }
    else if(language.length==0){
      setInvalidLanguage(true);
      setTimeout(() => {
        setInvalidLanguage(false);
      }, 1500);
    }
    else{
      navigation.navigate('signup-third', {fullName, phone, dob, nationality, country, language});
    }
  }

  return (
    <View style={styles.background}>
        <KeyboardAvoidingView style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Nationality</Text>
            <CountryPicker 
            open={openNationality}
            value={nationality}
            setOpen={setOpenNationality}
            setValue={setNationality}
           />
            {invalidNationality && <Text style={styles.error}>Please select your nationality</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Country of Residence</Text>
            <CountryPicker
            open={openCountry}
            value={country}
            setOpen={setOpenCountry}
            setValue={setCountry}
             />
            {invalidCountry && <Text style={styles.error}>Please select your country of residence</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Languages</Text>
            <LanguagePicker
             open={openLanguages}
             value={language}
             setOpen={setOpenLanguages}
             setValue={setLanguage}
            />
            {invalidlanguage && <Text style={styles.error}>Please select your spoken languages</Text>}
          </View>

          <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Already have an account?
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
          </Text>  
        </KeyboardAvoidingView>
    </View>
  )
}

export default SignupScreen2