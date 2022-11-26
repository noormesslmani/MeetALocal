import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
const EventCardStyle = StyleSheet.create({
    cardContainer:{
        margin:5,
        marginTop:15,
        borderRadius:20,
        width:0.43*widths.width,
        height:0.45*widths.width,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    image:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        width:0.43*widths.width,
        height: 0.3*widths.width,
    },
    title:{
        fontSize:12,
        marginLeft:7,
        fontWeight:"600",
        marginBottom:1
    },
    info:{
        fontSize:10,
        marginLeft:7,
        marginRight:7
    },
    savesContainer:{flexDirection:"row", alignItems:"center", margin:5},
    saves:{
        fontSize:10,
    }
});
export default EventCardStyle;