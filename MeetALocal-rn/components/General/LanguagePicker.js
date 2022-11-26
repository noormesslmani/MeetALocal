import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import { languagesOptions } from '../../constants/languages';
import { colors } from '../../constants/colors';
import PickerStyle from './Styles/PickerStyle';
const LanguagePicker=({open, value, setOpen, setValue})=>{
    const [languages, setLanguages] = useState(languagesOptions)
    
    return(
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
            open={open}
            multiple={true}
            mode="BADGE"
            value={value}
            dropDownDirection="TOP"
            items={languages}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setLanguages}
            placeholder="Select languages"
            listMode="MODAL"
            placeholderStyle={{
            color: "grey"
            }}
            style={PickerStyle.picker}
            />
    )
}
export default LanguagePicker