import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const EventsStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        paddingVertical:40,
        height:windowHeight
    },
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
    },
    add:{
        position:'absolute',
        top:"85%"
    },
    addIcon:{
        position:'absolute',
        top:"90%"
    }
});
export default EventsStyles;