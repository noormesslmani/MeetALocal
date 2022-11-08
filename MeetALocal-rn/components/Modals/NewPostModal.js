import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import PostModalStyles from '../ComponentsStyles/PostModalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { categoriesOptions } from '../../constants/categories';
import { countriesOptions } from '../../constants/countries';
import AppButton from '../Buttons/AppButtons';
const NewPostModal=({navigation, modalVisible, setModalVisible})=> {
    const [selectedCountry, setSelectedCountry]=useState(null)
    const [selectedCategory, setSelectedCategory]=useState([])
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [details, setDetails]= useState(null)
    const [invalidDetails, setInvalidDetails]= useState(false)
    const [invalidCountry, setInvalidCountry]= useState(false)
    const [invalidCategory, setInvalidCategory]= useState(false)
    const [countries, setcountries] = useState(countriesOptions); 
    const [categories, setCategories] = useState(categoriesOptions);
    const handleSubmit=()=>{
        setInvalidCategory(false)
        setInvalidCountry(false)
        setInvalidDetails(false)
        if(! details){
          setInvalidDetails(true)
          setTimeout(() => {
            setInvalidDetails(false);
          }, 1500);
        }
        else if(! selectedCountry){
          setInvalidCountry(true)
          setTimeout(() => {
            setInvalidCountry(false);
          }, 1500);
        }
        else if(selectedCategory.length==0){
          setInvalidCategory(true)
          setTimeout(() => {
            setInvalidCategory(false);
          }, 1500);
        }
        if(details && selectedCountry && selectedCategory.length>0){
            createPost() 
        } 
    }
    async function createPost(){
        const token = await AsyncStorage.getItem('@token')
        const data = {
          details: details,
          country: selectedCountry,
          category: selectedCategory
        }
        console.log(data)
        axios({
          method: "post",
          data,
          headers: { Authorization: `Bearer ${token}`},
          url:'http://192.168.1.7:8000/api/v1.0.0/users/post',
        })
        .then((response)=> {
          console.log(response.data)
          setModalVisible(false)
          return response;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);}}>
        <View style={PostModalStyles.centeredView}>
            <View style={PostModalStyles.modalView}>
            <KeyboardAwareScrollView style={{width:"100%"}}>
              <View style={{alignItems:"center", width:"100%"}}>
                <Text style={PostModalStyles.title}>Create New Post</Text>
                <Pressable style={PostModalStyles.closeModal} onPress={()=>setModalVisible(false)}><Icon name="close" size={25} color="grey" /></Pressable>
                <View style={PostModalStyles.contentContainer}>
                    <Text>Post *</Text>
                    <TextInput placeholder='new post' style={PostModalStyles.input} multiline={true} value={details} onChangeText={setDetails}></TextInput>
                    {invalidDetails && <Text style={PostModalStyles.error}>Please enter a valid text</Text>}
                </View>
                <View style={{width:"90%",marginBottom:40}}>
                    <Text >Select a country *</Text>
                    <DropDownPicker
                    defaultValue={null}
                    style={PostModalStyles.optionsContainer}
                    zIndex={3000}
                    zIndexInverse={1000}
                    open={openCountry}
                    value={selectedCountry}
                    dropDownDirection="BOTTOM"
                    items={countries}
                    setOpen={setOpenCountry}
                    setValue={setSelectedCountry}
                    setItems={setcountries}
                    listMode="SCROLLVIEW"
                    placeholder="Select a country"
                    closeAfterSelecting={true}
                    placeholderStyle={{
                    color: "grey"
                    }}
                    dropDownContainerStyle={{
                        marginTop:10,
                        borderColor:"#4BB0F9",
                        borderWidth:0.5
                    }}
                    />
                    {invalidCountry && <Text style={PostModalStyles.error}>Please select a country</Text>}
                </View >
                <View style={{marginTop:10, width:"90%"}}>
                    <Text>Select Categories * (max 3)</Text>
                    <DropDownPicker
                    multiple={true}
                    min={0}
                    max={3}
                    mode="BADGE"
                    style={PostModalStyles.optionsContainer}
                    zIndex={2000}
                    zIndexInverse={2000}
                    open={openCategory}
                    value={selectedCategory}
                    dropDownDirection="BOTTOM"
                    items={categories}
                    setOpen={setOpenCategory}
                    setValue={setSelectedCategory}
                    setItems={setCategories}
                    listMode="SCROLLVIEW"
                    placeholder="Select a category"
                    placeholderStyle={{
                    color: "grey"
                    }}
                    closeAfterSelecting={true}
                    dropDownContainerStyle={{
                        marginTop:10,
                        borderColor:"#4BB0F9",
                        borderWidth:0.5
                    }}
                    />
                    {invalidCategory && <Text style={PostModalStyles.error}>Please select a least 1 categroy</Text>}
                </View>
                <View style={PostModalStyles.buttonContainer}>
                  <AppButton text={'Submit'} handlePress={handleSubmit} />
                </View>
                </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    </Modal>
  )
}
export default NewPostModal