import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
import { colors } from "../../../constants/colors";

const WideButtonStyle = StyleSheet.create({
    button:{
        marginVertical:10,
        width:widths.width9,
        height:55,
        backgroundColor:'white',
        borderColor:colors.violet,
        flexDirection:"row",
        justifyContent:"center",
        borderRadius:10,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    text:{
        fontWeight:"700",
        color:"white"
    }, 
   
});
export default WideButtonStyle;