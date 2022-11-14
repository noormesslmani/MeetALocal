import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const HomeStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20
    },
    welcome:{
        fontSize:30,
        color:colors.violet
    },
    photo:{
        width: widths.width5,
        height: widths.width5,
        borderRadius: 0.25*widths.width,
        margin:30
    },
    cardContainer:{
        alignItems:"center",
    },
    cardItems:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"60%"
    },
    card:{
        backgroundColor:colors.lightViolet,
        width: widths.width7,
        height: 0.12*windowHeight,
        borderRadius:10,
        margin:5,
        alignItems:"center",
        justifyContent:"center"
    },
    label:{
        fontSize:30,
        color:"white",
        fontWeight:'900'
    }
   
});

export default HomeStyles;