import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const EventsStyles = StyleSheet.create({
    view:{
        flexDirection:"row",
        width:widths.width8,
        justifyContent:"space-between",
    },
    title:{
       fontSize:22,
       margin:10,
    },
    options:{
        fontSize:15,
        marginTop:10,
        marginBottom:25,
    },
    selected:{
        color:colors.violet,
        textDecorationLine:"underline",
        textDecorationColor:colors.violet
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