import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const LocalsStyles = StyleSheet.create({
    view:{
        flexDirection:"row",
        width:widths.width6,
        justifyContent:"space-between",
    },
    title:{
       fontSize:22,
       margin:10,
    },
    options:{
        fontSize:18,
        marginTop:10,
        marginBottom:25,
    },
    selected:{
        color:colors.violet,
        textDecorationLine:"underline",
        textDecorationColor:colors.violet
    },
    list:{
        width:widths.width,
        marginTop:20,
    },
    listContainer:{
        width:widths.width,
        alignItems:"center",
        height:windowHeight
    },
    
});
export default LocalsStyles;