import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;

const ScheduleStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        paddingTop:80,
        width:widths.width,
        height:windowHeight
    },
    list:{
        width:widths.width9,
    },
    labelsContainer:{
        flexDirection:"row",
        width:widths.width6,
        justifyContent:"space-between",
        alignItems:"center"
    },
    label:{
        flexDirection:"row",
        alignItems:"center"
    },
    circle:{
        height:16,
        width:16,
        borderRadius:8,
        shadowColor: "#000",
        backgroundColor:"white",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 3,
        margin:5
    },
    options:{
        flexDirection:"row",
        width:widths.width6,
        justifyContent:"space-between",
        marginTop:0.1*widths.width
    },
    add:{
        position:'absolute',
        top:"85%"
    }
});
export default ScheduleStyles;