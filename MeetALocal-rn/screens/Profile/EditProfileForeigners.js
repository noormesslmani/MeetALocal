import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Pressable} from 'react-native'
import React from 'react'
import HomeStyles from '../General/Styles/HomeStyles';
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/AntDesign'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadImage from '../../components/UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { countriesOptions } from '../../constants/countries';
import { languagesOptions } from '../../constants/languages';
const EditForeignerProfile=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const [uri, setUri]= useState(null)
    const [base64, setBase64]= useState(null)
    const [ext, setext]= useState(null)
    const [name, setName]= useState(user.name)
    const [phone, setPhone]= useState(user.phone)
    const [nationality, setNationality]=useState(user.nationality);
    const [residence, setResidence]=useState(user.residence);
    const [spokenLanguages, setSpokenLanguages]=useState(user.languages);
    const [openNationality, setOpenNationality] = useState(false);
    const [openResidece, setOpenResidence] = useState(false);
    const [openLanguages, setOpenLanguages] = useState(false);
    const [openGenders, setOpenGenders] = useState(false);
    const [datePicker, setDatePicker]= useState(false)
    const [date, setDate]= useState(new Date())
    const [dob, setdob]= useState(user.date_of_birth)
    const [gender, setGender]= useState(user.gender)
    const [about, setAbout]= useState(user.about)
    const [genders, setGenders] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}])
    const [countries, setCountries] = useState(countriesOptions);
      const [languages, setLanguages] = useState(languagesOptions);
      const handleDate= (event, value)=>{
        setDatePicker(false)
        setDate(value)
        setdob(`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`)
      }
    useEffect(()=>{
      if(user.profile_picture){
        setUri(`http://192.168.1.7:8000/${user.profile_picture}`)
      }
    },[user.profile_picture])
    const handleSave=async ()=>{
        const data = {
            name,
            phone,
            gender,
            nationality,
            residence,
            about,
            photo:base64,
            ext,
            languages:spokenLanguages,
            date_of_birth: dob
          };
          const token = await AsyncStorage.getItem('@token')
          axios({
            method: "put",
            data,
            headers: { Authorization: `Bearer ${token}`},
            url:"http://192.168.1.7:8000/api/v1.0.0/users/edit-profile",
          })
          .then(async (response)=> {
            setUser(response.data.data)
            return response.data;
          })
          .catch(function (error) {
            console.warn(error)
          });
    }
  return (
    <View style={ProfileStyles.container}>
        <UploadImage setBase64={setBase64} setext={setext} uri={uri} />
        <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
            <View style={ProfileStyles.inputContainer}>
                <View style={{margin:10}}>
                    <Text>Name</Text>
                    <TextInput value={name} onChange={setName} style={ProfileStyles.input}/>
                </View>
                <View style={{margin:10}}>
                    <Text>Phone Number</Text>
                    <TextInput value={phone.toString()} onChange={setPhone} style={ProfileStyles.input} keyboardType='numeric'/>
                </View>
                <View style={{margin:10}}>
                    <Text>About</Text>
                    <TextInput placeholder='Write something about yourself' multiline={true} value={about} onChangeText={setAbout} style={ProfileStyles.input} maxLength={200}/>
                </View>
                <View style={{margin:10}}>
                    <Text>Date of birth</Text>
                    <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginTop:10}}><Icon name="calendar" size={25}/></TouchableOpacity>
                </View>
                { datePicker && <DateTimePicker
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  onChange={handleDate}
                  maximumDate={new Date(2022, 1, 1)}
                  minimumDate={new Date(1900, 0, 1)}
                  />}
                <View style={{margin:10}}>
                    <Text>Nationality</Text>
                    <DropDownPicker
                    open={openNationality}
                    value={nationality}
                    zIndex={2000}
                    zIndexInverse={2000}
                    dropDownDirection="TOP"
                    items={countries}
                    setOpen={setOpenNationality}
                    setValue={setNationality}
                    setItems={setCountries}
                    dropDownContainerStyle={ProfileStyles.dropDownContainer}
                    style={ProfileStyles.dropDown}
                    placeholder="Select a country"
                    placeholderStyle={{
                    color: "grey"
                    }}
                    listMode="SCROLLVIEW"
                    closeAfterSelecting={true}
                    />
                </View>
                <View style={{margin:10}}>
                    <Text>Country of Residence</Text>
                    <DropDownPicker
                    open={openResidece}
                    value={residence}
                    zIndex={3000}
                    zIndexInverse={2000}
                    dropDownDirection="TOP"
                    items={countries}
                    setOpen={setOpenResidence}
                    setValue={setResidence}
                    setItems={setCountries}
                    dropDownContainerStyle={ProfileStyles.dropDownContainer}
                    style={ProfileStyles.dropDown}
                    placeholder="Select a country"
                    placeholderStyle={{
                    color: "grey"
                    }}
                    listMode="SCROLLVIEW"
                    closeAfterSelecting={true}
                    />
                </View>
                <View style={{margin:10}}>
                    <Text>Languages</Text>
                    <DropDownPicker
                    open={openLanguages}
                    multiple={true}
                    mode="BADGE"
                    value={spokenLanguages}
                    zIndex={1000}
                    zIndexInverse={3000}
                    dropDownDirection="TOP"
                    items={languages}
                    setOpen={setOpenLanguages}
                    setValue={setSpokenLanguages}
                    setItems={setLanguages}
                    dropDownContainerStyle={ProfileStyles.dropDownContainer}
                    style={ProfileStyles.dropDown}
                    placeholder="Select languages"
                    listMode="SCROLLVIEW"
                    placeholderStyle={{
                    color: "grey"
                    }}
                    />
                </View>
                <View style={{margin:10}}>
                    <Text>Gender</Text>
                    <DropDownPicker
                    open={openGenders}
                    value={gender}
                    zIndex={1000}
                    zIndexInverse={3000}
                    dropDownDirection="TOP"
                    items={genders}
                    setOpen={setOpenGenders}
                    setValue={setGender}
                    setItems={setGenders}
                    dropDownContainerStyle={ProfileStyles.dropDownContainer}
                    style={ProfileStyles.dropDown}
                    placeholder="Select gender"
                    listMode="SCROLLVIEW"
                    placeholderStyle={{
                    color: "grey"
                    }}
                    />
                </View>
                <View style={ProfileStyles.btnContainer}>
                    <Pressable style={ProfileStyles.btn} onPress={handleSave}><Text>Save</Text></Pressable>
                    <Pressable style={ProfileStyles.btn} onPress={()=>navigation.navigate("profile-foreigner")}><Text>Cancel</Text></Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>
    </View>
    
  )
}
export default EditForeignerProfile