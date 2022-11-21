import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext, createContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/AntDesign'
import UploadImage from '../../components/General/UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from '../../components/General/datePicker';
import BackArrow from '../../components/Header/BackArrow';
import AppButton from '../../components/Buttons/AppButtons';
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import Map from '../../components/Header/Map';
import { editProfile } from '../../network/App';
import CategoryPicker from '../../components/General/CategoryPicker';
import CountryPicker from '../../components/General/CountryPicker';
import LanguagePicker from '../../components/General/LanguagePicker';
import GenderPicker from '../../components/General/GenderPicker';
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

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
      });
    }, [navigation]);
    
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
          longitude: parseFloat(longitude),
          highlights: user.highlights
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

                <View style={ProfileStyles.pickerContainer}>
                    <Text>Nationality</Text>
                    <CountryPicker open={openNationality}
                    value={nationality}
                    setOpen={setOpenNationality}
                    setValue={setNationality}  
                    />
                </View>

                <View style={ProfileStyles.pickerContainer}>
                    <Text>Country of Residence</Text>
                    <CountryPicker open={openResidece}
                    value={residence}
                    setOpen={setOpenResidence}
                    setValue={setResidence}  />
                </View>

                <View style={ProfileStyles.pickerContainer}>
                    <Text>Languages</Text>
                    <LanguagePicker open={openLanguages}
                    value={spokenLanguages}
                    setOpen={setOpenLanguages}
                    setValue={setSpokenLanguages}  
                    />
                </View>

                <View style={ProfileStyles.pickerContainer}>
                    <Text>Categories</Text>
                    <CategoryPicker
                    open={openCategories}
                    value={categories}
                    setOpen={setOpenCategories}
                    setValue={setCategories}
                    multiple={true}
                    />
                </View>
                <View style={ProfileStyles.pickerContainer}>
                    <Text>Gender</Text>
                    <GenderPicker  open={openGenders}
                    value={gender}
                    zIndex={1000}
                    zInverse={5000} 
                    direction="TOP"
                    setOpen={setOpenGenders}
                    setValue={setGender}
                    />
                </View>

                <View style={{flexDirection:"row", margin:10}}><Text>Location</Text><Pressable><Map handleMap={handleMap} small={true}/></Pressable></View>
                {isLoading && <ActivityIndicator colors={colors.violet}/>}
                <View style={ProfileStyles.btnContainer}>
                    <AppButton text={'Save'} handlePress={handleSave} />
                    <AppButton text={'Cancel'} handlePress={() => navigation.goBack()} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    </View>
    
  )
}
export default EditLocalProfile