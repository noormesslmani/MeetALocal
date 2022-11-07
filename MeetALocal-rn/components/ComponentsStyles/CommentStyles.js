import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const CommentStyles = StyleSheet.create({
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
    }
   
});
export default CommentStyles;