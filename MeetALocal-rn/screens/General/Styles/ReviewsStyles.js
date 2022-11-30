import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const ReviewStyles = StyleSheet.create({
    container:{
        width:widths.width,
        flex:1,
        alignItems:"center",
        paddingTop:40,
    },
    averageContainer:{
        alignItems:"center",
        padding:10
    },
    averageText:{
        fontSize:30,
        marginVertical:10,
        color:colors.gold
    },
    reviewsNb:{
        marginVertical:10,
        fontSize:12
    },
    separator:{
        width:widths.width9,
        borderWidth:0.5,
        borderColor:colors.lightGrey,
        marginVertical:10
    },
   
});
export default ReviewStyles