import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const ChatScreenStyles = StyleSheet.create({
    imageContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    image:{width:30, height:30, borderRadius:15, margin:5},
    chatsList:{
        width:widths.width,
        height:windowHeight
    }

});
export default ChatScreenStyles;