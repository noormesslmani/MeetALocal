import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../constants/dimensions";

const MessageCardStyles = StyleSheet.create({
    container:{
        width:widths.width,
        height:120,
        justifyContent:"center"
    },
    messageContainer:{
        width:widths.width,
        height:110,
        flexDirection:"row",
        backgroundColor:"white",
        padding:15,
    },
    text:{
        color:"grey",
        fontSize:12,
        marginTop:5
    },
    avatar:{
        margin:10,
        width:60,
        height:60,
        borderRadius:30
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: widths.width9,
        marginBottom:10,
    },
   
});
export default MessageCardStyles;