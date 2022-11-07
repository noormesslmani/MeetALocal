import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const EventsStyles = StyleSheet.create({
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
        color:colors.violet
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: widths.width9,
        marginBottom:10,
    },
    list:{
        alignSelf:"center",
    },
    listContainer:{
        width:widths.width,
        alignItems:"center",
    }
});
export default EventsStyles;