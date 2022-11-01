import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const CommentStyles = StyleSheet.create({
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:0.9*windowWidth,
        padding:5,
    },
    image:{
        width:50,
        height:50,
        borderRadius:25
    },
    commentContainer:{
        width:windowWidth,
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
        width:0.8*windowWidth,
        paddingLeft:10,
    }
   
});
export default CommentStyles;