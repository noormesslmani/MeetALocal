import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from "react";
import { categoriesOptions } from '../../constants/categories';
import { categoriesSpecificOptions } from '../../constants/categories';
import PickerStyle from './Styles/PickerStyle';
const CategoryPicker=({open, value, setOpen, setValue, type=1, multiple=false})=>{
    const [categories, setCategories]=useState(type==1?categoriesOptions: categoriesSpecificOptions)
   
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
            max={3}
            min={1}
            mode="BADGE"
            placeholderStyle={{
            color: "grey"
            }}
            listMode="MODAL"
            closeAfterSelecting={true}
            multiple={multiple}
            />
    )
}
export default CategoryPicker