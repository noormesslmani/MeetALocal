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
        height:170,
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
        fontSize:16,
        fontWeight:"500",
        color: colors.violet,
        marginBottom:5
    },
    bookedDate:{
        color:"white"
    },
    booked:{
        backgroundColor:colors.lightViolet,
    },
    name:{
        fontWeight:"600",
        fontSize:16,
        marginLeft:2
    },
    dateTime:{
        fontSize:16,
        marginBottom:5
    },
    trash:{position:"absolute", bottom:10, right:10}
});
export default ScheduleCardStyle;