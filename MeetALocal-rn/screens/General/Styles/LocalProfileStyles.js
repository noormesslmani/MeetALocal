import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const LocalProfileStyles = StyleSheet.create({
    mainContainer:{
        width: widths.width,
        padding:30,
        alignItems:"center"
    },
    imageContainer:{
        width:widths.width9,
        flexDirection:"row",
        marginBottom:30
    },
    infoContainer:{
        width:widths.width9,
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:20
    },
    image:{
        width:120,
        height:120,
        borderRadius:60
    },
    message:{
        backgroundColor: colors.violet,
        width:80,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    },
    separator:{
        width:widths.width9,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        marginBottom:20,
    },
    about:{
        width:widths.width9,
        marginBottom:40
    },
    iconContainer:{
        alignItems:"center",
        marginTop:20,
        marginRight:25,
        flexWrap:"wrap"
    },
    highlightImages:{
        flexDirection:"row",
        justifyContent:"center",
        width: widths.width9,
    },
    highlightimg:{
        width:widths.width4,
        height:0.35*widths.width,
        margin:5
    }

});
export default LocalProfileStyles;