import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalStyles from '../ComponentsStyles/FilterModalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { countriesOptions } from '../../constants/countries';
import { categoriesOptions } from '../../constants/categories';
const FilterModal=({navigation, modalVisible, setModalVisible, setCountry, setCategory})=> {
    const [selectedCountry, setSelectedCountry]=useState('all')
    const [selectedCategory, setSelectedCategory]=useState('all')
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [countries, setcountries] = useState(countriesOptions); 
    const [categories, setCategories] = useState(categoriesOptions);
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
            <Text style={ModalStyles.modalTitle}>Apply Filters</Text>
            <View style={ModalStyles.dropDownContainer}>
              <Text>Select a country</Text>
              <DropDownPicker
              style={ModalStyles.dropDown}
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
            </View>
            <View style={ModalStyles.dropDownContainer}>
            <Text>Select a category</Text>
            <DropDownPicker
            style={ModalStyles.dropDown}
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