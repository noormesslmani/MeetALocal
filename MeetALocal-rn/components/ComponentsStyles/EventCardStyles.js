import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";
const EventCardStyles = StyleSheet.create({
    cardContainer:{
        margin:5,
        marginTop:15,
        borderRadius:20,
        width:0.43*widths.width,
        height:0.43*widths.width,
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
        fontSize:15,
        marginLeft:7,
        fontWeight:"400",
        marginBottom:1
    },
    info:{
        fontSize:10,
        marginLeft:7,
        marginRight:7
    }
});
export default EventCardStyles;