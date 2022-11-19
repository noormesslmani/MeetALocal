import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
import { colors } from "../../../constants/colors";

const AppButtonStyle = StyleSheet.create({
    button:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#e2d2ef",
        borderRadius: 20,
        padding:10,
        width:0.25*widths.width,
        height:45
    },
    text:{
        fontWeight:"700",
        color:"white"
    },
   
   
});
export default AppButtonStyle;