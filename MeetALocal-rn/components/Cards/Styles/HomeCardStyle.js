import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const HomeCardStyle = StyleSheet.create({
    cardContainer:{
        alignItems:"center",
    },
    cardItems:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"60%"
    },
    card:{
        backgroundColor:"#e2d2ef",
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
export default HomeCardStyle;