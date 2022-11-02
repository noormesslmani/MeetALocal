import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import PostModalStyles from '../ComponentsStyles/PostModalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
const NewPostModal=({navigation, modalVisible, setModalVisible})=> {
    const [selectedCountry, setSelectedCountry]=useState(null)
    const [selectedCategory, setSelectedCategory]=useState([])
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
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
    const [categories, setCategories] = useState([
    {label: 'Tourism', value: 'Tourism', icon: () => <Image source={tourism} style={{width:20, height:20}} />},
    {label: 'Languages', value: 'Languages', icon: () => <Image source={languages} style={{width:20, height:20}}/>},
    {label: 'Culture', value: 'Culture', icon: () => <Image source={cultures} style={{width:20, height:20}}/>},
    {label: 'Education', value: 'Education', icon: () => <Image source={education} style={{width:20, height:20}}/>},
    {label: 'History', value: 'History', icon: () => <Image source={history} style={{width:20, height:20}}/>},
    {label: 'Guidance', value: 'Guidance', icon: () => <Image source={guidance} style={{width:20, height:20}}/>},
    {label: 'Jobs', value: 'Jobs', icon: () => <Image source={jobs} style={{width:20, height:20}}/>},
    {label: 'Housing', value: 'Housing', icon: () => <Image source={house} style={{width:20, height:20}}/>},
    {label: 'Other', value: 'Other', icon: () => <Image source={more} style={{width:20, height:20}}/>},
    ]);
  
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={PostModalStyles.centeredView}>
            <View style={PostModalStyles.modalView}>
                <Text style={PostModalStyles.title}>Create New Post</Text>
                <View style={PostModalStyles.contentContainer}>
                    <Text>Post *</Text>
                    <TextInput placeholder='new post' style={PostModalStyles.input} multiline={true}></TextInput>
                </View>
                <View style={{width:"80%"}}>
                    <Text style={{fontSize:12}}>Select a country *</Text>
                    <DropDownPicker
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
                        marginTop:10
                    }}
                    />
                </View >
                <View style={{marginTop:20, width:"80%"}}>
                    <Text style={{fontSize:12}}>Select Categories * (max 3)</Text>
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
                        marginTop:10
                    }}
                    />
                </View>
                <Pressable
                style={PostModalStyles.button}>
                <Text style={PostModalStyles.textStyle}>Submit</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
  )
}
export default NewPostModal