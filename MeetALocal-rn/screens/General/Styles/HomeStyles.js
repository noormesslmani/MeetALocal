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
        fontSize:45,
        color:colors.violet
    },
    name:{
        fontSize:20,
        margin:5,
    },
    photo:{
        width: widths.width4,
        height: widths.width4,
        borderRadius: 0.2*widths.width,
        margin:15
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