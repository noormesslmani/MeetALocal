import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import AppButton from '../Buttons/AppButtons';
import FilterModalStyle from './Styles/FilterModalStyle';
import CategoryPicker from '../General/CategoryPicker';
import CountryPicker from '../General/CountryPicker';
const FilterModal=({navigation, modalVisible, setModalVisible, setCountry, setCategory})=> {
    const [selectedCountry, setSelectedCountry]=useState('all')
    const [selectedCategory, setSelectedCategory]=useState('all')
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
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
        <View style={FilterModalStyle.centeredView}>
        <View style={FilterModalStyle.modalView}>
            <Text style={FilterModalStyle.modalTitle}>Apply Filters</Text>
            <View style={FilterModalStyle.dropDownContainer}>
              <Text>Select a country</Text>
              <CountryPicker 
               open={openCountry}
               value={selectedCountry}
               setOpen={setOpenCountry}
                setValue={setSelectedCountry}
                type={2}
              />
              
            </View>
            <View style={FilterModalStyle.dropDownContainer}>
            <Text>Select a category</Text>
            <CategoryPicker
             open={openCategory}
             value={selectedCategory}
             setOpen={setOpenCategory}
            setValue={setSelectedCategory}
            />
            
            </View>
            <View style={FilterModalStyle.btnContainer}>
            <AppButton text={'Apply'} handlePress={handleSave}/>
            <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)}/>
            </View>
        </View>
        </View>
    </Modal>
  )
}
export default FilterModal