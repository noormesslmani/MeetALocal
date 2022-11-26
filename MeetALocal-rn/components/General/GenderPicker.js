import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState} from "react";
import PickerStyle from './Styles/PickerStyle';
const GenderPicker=({open, value, setOpen, setValue, zIndex, zInverse, direction})=>{
    const [genders, setGenders] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}])
    
    return(
        <DropDownPicker
            open={open}
            value={value}
            zIndex={zIndex}
            zIndexInverse={zInverse}
            dropDownDirection={direction}
            items={genders}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setGenders}
            placeholder="Select gender"
            listMode="SCROLLVIEW"
            dropDownContainerStyle={PickerStyle.dropDownContainer}
            placeholderStyle={{
            color: "grey"
            }}
            style={PickerStyle.picker}
            />
    )
}
export default GenderPicker