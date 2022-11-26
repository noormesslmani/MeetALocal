import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";

const ScheduleCardStyle = StyleSheet.create({
    container:{
        margin:5,
        marginTop:15,
        borderRadius:20,
        padding:10,
        width:0.4*widths.width,
        height:0.25*widths.width,
        backgroundColor:'white',
        alignItems:"center",
        justifyContent:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    longerContainer:{
        height:"auto",
        alignItems:"flex-start",
        justifyContent:"flex-start"

    },
    localContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        marginVertical:10,
       
    },
    timeContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    arrow:{
        margin:3
    },
    date:{
        fontSize:12,
        fontWeight:"500",
        color: colors.violet,
    },
    bookedDate:{
        color:"white"
    },
    booked:{
        backgroundColor:colors.lightViolet,
    },
    name:{
        fontWeight:"600",
        fontSize:14,
        marginLeft:2,
        overflow:"hidden"
    },
    dateTime:{
        fontSize:14,
        marginRight:5
    },
    trash:{
        position:"absolute", 
        top:3, 
        right:7
    },
    locationContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    dateTimeContainer:{
        flexDirection:"row",
        alignItems:"flex-end"
    },
});
export default ScheduleCardStyle;