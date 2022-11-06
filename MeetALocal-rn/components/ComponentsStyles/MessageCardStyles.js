import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MessageCardStyles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:120,
        justifyContent:"center"
    },
    messageContainer:{
        width:windowWidth,
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
        width: 0.9*windowWidth,
        marginBottom:10,
    },
   
});
export default MessageCardStyles;