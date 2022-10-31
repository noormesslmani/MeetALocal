import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalStyles from '../ComponentsStyles/FilterModalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import tourism from '../../assets/tourism.png'
import cultures from '../../assets/cultures.png'
import education from '../../assets/education.png'
import guidance from '../../assets/guidance.png'
import history from '../../assets/history.png'
import house from '../../assets/house.png'
import languages from '../../assets/languages.png'
import more from '../../assets/more.png'
import jobs from '../../assets/suitcase.png'
const FilterModal=({navigation, modalVisible, setModalVisible, setCountry, setCategory})=> {
    const [selectedCountry, setSelectedCountry]=useState('all')
    const [selectedCategory, setSelectedCategory]=useState('all')
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [countries, setcountries] = useState([
        {label: 'All countries', value: 'all'},
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
    {label: 'All categories', value: 'all'},
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
    const handleSave=()=>{
        setModalVisible(!modalVisible)
        setCountry(selectedCountry)
        setCategory(selectedCategory)
    }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={ModalStyles.centeredView}>
        <View style={ModalStyles.modalView}>
            <Text style={ModalStyles.modalText}>Apply Filters</Text>
            <DropDownPicker
            style={{marginTop:30}}
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
                marginTop:30
              }}
            />
            <DropDownPicker
            style={{marginTop:30}}
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
                marginTop:30
            }}
            />
            <Pressable
            style={ModalStyles.button}
            onPress={handleSave}>
            <Text style={ModalStyles.textStyle}>Apply Filters</Text>
            </Pressable>
        </View>
        </View>
    </Modal>
  )
}
export default FilterModal