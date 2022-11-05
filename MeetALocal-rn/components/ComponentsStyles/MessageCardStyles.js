import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MessageCardStyles = StyleSheet.create({
    messageContainer:{
        width:windowWidth,
        height:200,
        flexDirection:"row",
        backgroundColor:"white",
        padding:20
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:50
    }
   
});
export default MessageCardStyles;