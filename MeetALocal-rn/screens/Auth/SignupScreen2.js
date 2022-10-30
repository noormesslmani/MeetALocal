import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import AuthButton from '../../components/AuthButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
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
  const [countries, setcountries] = useState([
    {label: 'Lebanon', value: 'Lebanon'},
    {label: 'USA', value: 'USA'},
    {label: 'Syria', value: 'Syria'},
    {label: 'Egypt', value: 'Egypt'},
    {label: 'KSA', value: 'KSA'},
    {label: 'Turkey', value: 'Turkey'},
    {label: 'France', value: 'France'},
    {label: 'Iran', value: 'Iran'},
    {label: 'Germany', value: 'Germany'},
    {label: 'Brazil', value: 'Brazil'},
    {label: 'Italy', value: 'Italy'},
    {label: 'Jordan', value: 'Jordan'},
    {label: 'Morocco', value: 'Morocco'},
    {label: 'Canada', value: 'Canada'},
  ]);
  const [languages, setLanguages] = useState([
    {label: 'English', value: 'English'},
    {label: 'French', value: 'French'},
    {label: 'Arabic', value: 'Arabic'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'Turkish', value: 'Turkish'},
    {label: 'German', value: 'German'},
    {label: 'Russian', value: 'Russian'},
    {label: 'Persian', value: 'Persian'},
  ]);
  const handleSubmit=()=>{
    setInvalidCountry(false)
    setInvalidNationality(false)
    setInvalidLanguage(false)
    if(! nationality){
      setInvalidNationality(true)
    }
    else if(! country){
      setInvalidCountry(true)
    }
    else if(language.length==0){
      setInvalidLanguage(true)
    }
    else{
      navigation.navigate('signup-third', {
        fullName, phone, dob, nationality, country, language,
      });
    }
  }

  return (
    <View style={styles.background}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <Text>Nationality</Text>
            <DropDownPicker
            open={openNationality}
            value={nationality}
            dropDownDirection="BOTTOM"
            items={countries}
            setOpen={setOpenNationality}
            setValue={setNationality}
            setItems={setcountries}
            containerStyle={styles.dropDownContainer}
            style={styles.dropDown}
            listMode="MODAL"
            placeholder="Select a country"
            placeholderStyle={{
              color: "grey"
            }}
            />
            {invalidNationality && <Text style={styles.error}>Please select your nationality</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Country of Residence</Text>
            <DropDownPicker
            open={openCountry}
            value={country}
            dropDownDirection="BOTTOM"
            items={countries}
            setOpen={setOpenCountry}
            setValue={setCountry}
            setItems={setcountries}
            containerStyle={styles.dropDown}
            style={styles.dropDown}
            listMode="MODAL"
            placeholder="Select a country"
            placeholderStyle={{
              color: "grey"
            }}
            />
            {invalidCountry && <Text style={styles.error}>Please select your country of residence</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text>Languages</Text>
            <DropDownPicker
            open={openLanguages}
            multiple={true}
            value={language}
            dropDownDirection="BOTTOM"
            items={languages}
            setOpen={setOpenLanguages}
            setValue={setLanguage}
            setItems={setLanguages}
            containerStyle={styles.dropDown}
            style={styles.dropDown}
            listMode="MODAL"
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
        </View>
    </View>
  )
}

export default SignupScreen2