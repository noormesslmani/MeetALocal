import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const EventsStyles = StyleSheet.create({
    view1:{
        flexDirection:"row",
        width:widths.width6,
        justifyContent:"space-between",
    },
    view2:{
        flexDirection:"row",
        width:widths.width8,
        justifyContent:"space-between",
    },
    title:{
       fontSize:22,
       margin:10,
    },
    options:{
        fontSize:16,
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
        height:windowHeight
    },
    add:{
        position:'absolute',
        bottom:50
    }
});
export default EventsStyles;