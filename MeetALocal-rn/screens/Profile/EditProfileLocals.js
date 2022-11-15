import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import HomeStyles from '../General/Styles/HomeStyles';
import { UserContext } from '../../App'
import { useState, useEffect, useContext, createContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/AntDesign'
import UploadImage from '../../components/General/UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from '../../components/General/datePicker';
import { countriesOptionsOneCountry} from '../../constants/countries';
import { languagesOptions } from '../../constants/languages';
import AppButton from '../../components/Buttons/AppButtons';
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import { categoriesSpecificOptions } from '../../constants/categories';
import Map from '../../components/Header/Map';
import { editProfile } from '../../network/App';
const EditLocalProfile=({navigation})=> {

    const { user, setUser} = useContext(UserContext);
    const [uri, setUri]= useState(null)
    const [base64, setBase64]= useState(null)
    const [ext, setext]= useState(null)
    const [name, setName]= useState(user.name)
    const [phone, setPhone]= useState(user.phone)
    const [nationality, setNationality]=useState(user.nationality);
    const [residence, setResidence]=useState(user.residence);
    const [categories, setCategories]=useState(user.categories);
    const [spokenLanguages, setSpokenLanguages]=useState(user.languages);
    const [openNationality, setOpenNationality] = useState(false);
    const [openResidece, setOpenResidence] = useState(false);
    const [openLanguages, setOpenLanguages] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [openGenders, setOpenGenders] = useState(false);
    const [datePicker, setDatePicker]= useState(false)
    const [date, setDate]= useState(new Date())
    const [dob, setdob]= useState(user.date_of_birth)
    const [gender, setGender]= useState(user.gender)
    const [about, setAbout]= useState(user.about)
    const [fees, setFees]= useState(user.fees)
    const [genders, setGenders] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}])
    const [countries, setCountries] = useState(countriesOptionsOneCountry);
    const [languages, setLanguages] = useState(languagesOptions);
    const [categoriesOptions, setCategoriesOptions]=useState(categoriesSpecificOptions)
    const [isLoading, setIsLoading]=useState(false)
      const handleDate= (event, value)=>{
        setDatePicker(false)
        setDate(value)
        setdob(`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`)
      }
    useEffect(()=>{
      if(user.profile_picture){
        setUri(`${address}/${user.profile_picture}`)
      }
    },[user.profile_picture])
    const handleCancel=()=>{
      navigation.navigate("profile-foreigner")
    }
    useEffect(()=>{
      setLocation()
    },[])
    const setLocation=async()=>{
      await AsyncStorage.setItem('lat', user.latitude.toString())
      await AsyncStorage.setItem('lng', user.longitude.toString())
    }
    const handleSave=async ()=>{
      setIsLoading(true)
      const latitude = await AsyncStorage.getItem('lat')
      const longitude = await AsyncStorage.getItem('lng')
      const data = {
          name,
          phone,
          gender,
          nationality,
          residence,
          about,
          fees: parseInt(fees),
          photo:base64,
          ext,
          languages:spokenLanguages,
          categories,
          date_of_birth: dob,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        };
        console.log(data)
        const result= await editProfile(data)
        if (result.success){
          setUser(result.data.data)
        }
        setIsLoading(false)
  }
    const handleMap=()=>{

      navigation.navigate('edit-location',{lat:user.latitude, lng:user.longitude})
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
                    <Text>Fees</Text>
                    <TextInput placeholder='Fees' keyboardType="numeric"  value={fees} onChangeText={setFees} style={ProfileStyles.input}/>
                </View>
                <View style={{margin:10}}>
                    <Text>Date of birth</Text>
                    <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginTop:10}}><Icon name="calendar" size={25}/></TouchableOpacity>
                </View>
                { datePicker && <DatePicker date={date} handleDate={handleDate} />}
                <View style={{margin:10}}>
                    <Text>Nationality</Text>
                    <DropDownPicker
                    searchable={true}
                    searchPlaceholder="Search..."
                    searchPlaceholderTextColor="grey"
                    searchContainerStyle={{
                      borderBottomColor: colors.lighterViolet
                    }}
                    searchTextInputStyle={{
                      borderColor:colors.lightViolet,
                    }}
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
                    searchable={true}
                    searchPlaceholder="Search..."
                    searchPlaceholderTextColor="grey"
                    searchContainerStyle={{
                      borderBottomColor: colors.lighterViolet
                    }}
                    searchTextInputStyle={{
                      borderColor:colors.lightViolet,
                    }}
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
                    <Text>Categories</Text>
                    <DropDownPicker
                    open={openCategories}
                    value={categories}
                    zIndex={1000}
                    zIndexInverse={3000}
                    multiple={true}
                    mode="BADGE"
                    dropDownDirection="TOP"
                    items={categoriesOptions}
                    setOpen={setOpenCategories}
                    setValue={setCategories}
                    setItems={setCategoriesOptions}
                    dropDownContainerStyle={ProfileStyles.dropDownContainer}
                    style={ProfileStyles.dropDown}
                    placeholder="Select categories"
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
                <View style={{flexDirection:"row", margin:10}}><Text>Location</Text><Pressable><Map handleMap={handleMap} small={true}/></Pressable></View>
                {isLoading && <ActivityIndicator colors={colors.violet}/>}
                <View style={ProfileStyles.btnContainer}>
                    <AppButton text={'Save'} handlePress={handleSave} />
                    <AppButton text={'Cancel'} handlePress={handleCancel} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    </View>
    
  )
}
export default EditLocalProfile