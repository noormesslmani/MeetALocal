import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const PickerStyle = StyleSheet.create({
    picker:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:colors.lightViolet,
        borderBottomWidth:0.5,
        width:'100%',
    },
    dropDownContainer:{
        width:'100%',
        borderRadius:0,
        borderWidth:0.5,
    }

});
export default PickerStyle;