import { View, Text, Modal} from 'react-native';
import React from 'react';
import { useState} from "react";
import AppButton from '../Buttons/AppButtons';
import FilterModalStyle from './Styles/FilterModalStyle';
import CategoryPicker from '../General/CategoryPicker';
import CountryPicker from '../General/CountryPicker';
const FilterModal=({navigation, modalVisible, setModalVisible, setCountry, setCategory, setFilterChange})=> {
    //selected country and category(by default all)
    const [selectedCountry, setSelectedCountry]=useState('all');
    const [selectedCategory, setSelectedCategory]=useState('all');

    //country and category pickers
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    //saving selections
    const handleSave=()=>{
        setModalVisible(!modalVisible);
        setCountry(selectedCountry);
        setCategory(selectedCategory);
        setFilterChange(true);
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