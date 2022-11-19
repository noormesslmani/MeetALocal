import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from "react";
import { categoriesOptions } from '../../constants/categories';
import { categoriesSpecificOptions } from '../../constants/categories';
import PickerStyle from './Styles/PickerStyle';
const CategoryPicker=({open, value, setOpen, setValue, type=1})=>{
    const [categories, setCategories]=useState(categoriesOptions)
   
    console.log(type)
    return(
        <DropDownPicker
            open={open}
            value={value}
            items={categories}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setCategories}
            style={PickerStyle.picker}
            placeholder="Select a Category"
            placeholderStyle={{
            color: "grey"
            }}
            listMode="MODAL"
            closeAfterSelecting={true}
            />
    )
}
export default CategoryPicker