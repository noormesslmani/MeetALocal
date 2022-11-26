import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const SearchPageStyles = StyleSheet.create({
    list:{
        width:widths.width,
        marginTop:60,
    },
    listContainer:{
        width:widths.width,
        alignItems:"center",
        height:windowHeight
    },

    
});
export default SearchPageStyles;