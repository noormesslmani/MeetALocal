import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
import { countriesOptions } from '../../constants/countries';
import { languagesOptions } from '../../constants/languages';
const SignupScreen2 = ({navigation}) => {
  const route = useRoute();
  const fullName= route.params.fullName
  const phone= route.params.phone
  const dob =route.params.dob
  
  const [nationality, setNationality]=useState(null);
  const [country, setCountry]=useState(null);
  const [language, setLanguage]=useState([]);
  const [invalidCountry, setInvalidCountry]=useState(false)
  const [invalidNationality, setInvalidNationality]=useState(false)
  const [invalidlanguage, setInvalidLanguage]=useState(false)
  const [openNationality, setOpenNationality] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [countries, setcountries] = useState(countriesOptions);
  const [languages, setLanguages] = useState(languagesOptions);
  const handleSubmit=()=>{
    setInvalidCountry(false)
    setInvalidNationality(false)
    setInvalidLanguage(false)
    if(! nationality){
      setInvalidNationality(true)
      setTimeout(() => {
        setInvalidNationality(false);
      }, 1500);
    }
    else if(! country){
      setInvalidCountry(true)
      setTimeout(() => {
        setInvalidCountry(false);
      }, 1500);
    }
    else if(language.length==0){
      setInvalidLanguage(true)
      setTimeout(() => {
        setInvalidLanguage(false);
      }, 1500);
    }
    else{
      navigation.navigate('signup-third', {
        fullName, phone, dob, nationality, country, language,
      });
    }
  }

  return (
    <View style={styles.background}>
        <KeyboardAvoidingView style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <Text>Nationality</Text>
            <DropDownPicker
            open={openNationality}
            value={nationality}
            zIndex={3000}
            zIndexInverse={1000}
            dropDownDirection="BOTTOM"
            items={countries}
            setOpen={setOpenNationality}
            setValue={setNationality}
            setItems={setcountries}
            dropDownContainerStyle={{
              marginTop:10
            }}
            style={styles.dropDown}
            placeholder="Select a country"
            placeholderStyle={{
              color: "grey"
            }}
            listMode="SCROLLVIEW"
            closeAfterSelecting={true}
            />
            {invalidNationality && <Text style={styles.error}>Please select your nationality</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Country of Residence</Text>
            <DropDownPicker
            open={openCountry}
            value={country}
            zIndex={2000}
            zIndexInverse={2000}
            dropDownDirection="BOTTOM"
            items={countries}
            setOpen={setOpenCountry}
            setValue={setCountry}
            setItems={setcountries}
            dropDownContainerStyle={{
              marginTop:10
            }}
            style={styles.dropDown}
            listMode="SCROLLVIEW"
            closeAfterSelecting={true}
            placeholderStyle={{
            color: "grey"
            }}
            placeholder="Select a country"
            />
            
            {invalidCountry && <Text style={styles.error}>Please select your country of residence</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Languages</Text>
            <DropDownPicker
            open={openLanguages}
            multiple={true}
            mode="BADGE"
            value={language}
            zIndex={1000}
            zIndexInverse={3000}
            dropDownDirection="BOTTOM"
            items={languages}
            setOpen={setOpenLanguages}
            setValue={setLanguage}
            setItems={setLanguages}
            dropDownContainerStyle={{
              marginTop:10
            }}
            style={styles.dropDown}
            placeholder="Select languages"
            placeholderStyle={{
              color: "grey"
            }}
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