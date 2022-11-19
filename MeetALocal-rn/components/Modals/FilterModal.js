import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { countriesOptions } from '../../constants/countries';
import { categoriesOptions } from '../../constants/categories';
import AppButton from '../Buttons/AppButtons';
import FilterModalStyle from './Styles/FilterModalStyle';
import { colors } from '../../constants/colors';
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
        <View style={FilterModalStyle.centeredView}>
        <View style={FilterModalStyle.modalView}>
            <Text style={FilterModalStyle.modalTitle}>Apply Filters</Text>
            <View style={FilterModalStyle.dropDownContainer}>
              <Text>Select a country</Text>
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
              style={FilterModalStyle.dropDown}
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
            <View style={FilterModalStyle.dropDownContainer}>
            <Text>Select a category</Text>
            <DropDownPicker
            style={FilterModalStyle.dropDown}
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