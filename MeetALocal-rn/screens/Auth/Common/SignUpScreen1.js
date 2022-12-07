import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { useState, useEffect} from "react";
import AuthButton from '../../../components/Buttons/AuthButton';
import DatePicker from '../../../components/General/datePicker';
import styles from '../Styles/AuthScreensStyle';
import PhoneInput from "react-native-phone-number-input";
import { colors } from '../../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SignupScreen = ({navigation}) => {
  const [fullName, setFullName]=useState('');
  const [invalidName, setInvalidName]=useState(false);
  const [phone, setPhone]=useState(0);
  const [invalidPhone, setInvalidPhone]=useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dob, setdob]=useState('');
  const [invalidDate, setinvalidDate] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);


  const handleDate= (event, value)=>{
    setDatePicker(false);
    setDate(value);
    setinvalidDate(false);
  }
  //set date of birth
  useEffect(()=>{
    setDateSelected(true);
    setdob(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
  },[date]);
 
  //check if fields are filled first
  const handleSubmit=()=>{
    if(fullName==''){
      setInvalidName(true);
      setTimeout(() => {
        setInvalidName(false);
      }, 1500);
    }
    else if(phone==0){
      setInvalidPhone(true);
      setTimeout(() => {
        setInvalidPhone(false);
      }, 1500);
    }
    else if(! dateSelected){
      setinvalidDate(true);
      setTimeout(() => {
        setinvalidDate(false);
      }, 1500);
    }
    else{
      navigation.navigate('signup-second', {fullName, phone:phone.substring(1) , dob});
    }
  }
 
  return (
    <View style={styles.background}>
      <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}  showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
        <View style={[styles.formContainer, styles.shadowProp, styles.signUp]}>
          <Text style={styles.signIn}>Register</Text>
          <View style={styles.inputContainer}>
            <TextInput label="Full Name" style={styles.input} onChangeText={setFullName} 
            value={fullName} left={<TextInput.Icon icon={()=><FontAwesome name='user' size={20} />} />} underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet}></TextInput>
            {invalidName && <Text style={styles.error}>Please enter your name</Text>}
          </View>
    
          <View style={styles.inputContainer}>
            <PhoneInput
              value={phone}
              defaultCode="LB"
              layout="second"
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.phoneText}
              textInputStyle={styles.phoneInput}
              countryPickerButtonStyle={{ height:55, width:70}}
              codeTextStyle={styles.phoneInput}
              placeholder= 'phone'
              onChangeFormattedText={(text) => {
                setPhone(text);
              }}
            />
             {invalidPhone && <Text style={styles.error}>Please enter your phone number</Text>}
          </View>
    
          <View style={styles.inputContainer}>
            <Text>Date of birth</Text>
            <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginTop:10}}><FontAwesome name="birthday-cake" size={25}/></TouchableOpacity>
            {invalidDate && <Text style={styles.error}>Please select the date of birth</Text>}
          </View>

          <AuthButton title={'Next'} handleSubmit={handleSubmit} ></AuthButton>
          <Text style={styles.text}>Already have an account? 
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('signin')}>
                Login
          </Text> 
          { datePicker && <DatePicker date={date} handleDate={handleDate} />}
            </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default SignupScreen