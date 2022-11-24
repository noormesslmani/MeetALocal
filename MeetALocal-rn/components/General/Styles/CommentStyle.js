import { StyleSheet } from "react-native";
import { widths } from "../../../constants/dimensions";
const CommentStyle = StyleSheet.create({
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:widths.width9,
        padding:10,
    },
    image:{
        width:50,
        height:50,
        borderRadius:25
    },
    commentContainer:{
        width:widths.width,
        height:"auto",
        backgroundColor:"white"
    },
    comments:{
        fontSize:11, 
        fontWeight:"300", 
        margin:2,
        fontWeight:"100"
    },
    details:{
        width:widths.width8,
        paddingLeft:10,
    },
    comment:{
        fontSize:12, 
        marginTop:5, 
        fontWeight:"300"
    },
    name:{
        fontSize:12, 
        fontWeight:"600"
    },
    type:{
        fontSize:8, 
        marginLeft:5, 
        color:"#8C57BA"
    },
    countryContainer:{
        flexDirection:"row",
    },
    country:{
        fontSize:11, 
    }
   
});
export default CommentStyle;