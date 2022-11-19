import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from "react";
import { countriesOptionsOneCountry } from '../../constants/countries';
import { countriesOptions } from '../../constants/countries';
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import PickerStyle from './Styles/PickerStyle';
const CountryPicker=({open, value, setOpen, setValue, type=1})=>{
    
    const [countries, setCountries] = useState(type==1? countriesOptionsOneCountry: countriesOptions)
    console.log(type)
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
            value={value}
            items={countries}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setCountries}
            style={PickerStyle.picker}
            placeholder="Select a country"
            placeholderStyle={{
            color: "grey"
            }}
            listMode="MODAL"
            closeAfterSelecting={true}
            />
    )
}
export default CountryPicker