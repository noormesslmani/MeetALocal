import { StyleSheet} from "react-native";
import { widths } from "../../../constants/dimensions";
import { colors } from "../../../constants/colors";
const MessageCardStyle = StyleSheet.create({
    container:{
        width:widths.width,
        height:120,
        justifyContent:"center",
    },
    messageContainer:{
        width:widths.width,
        height:110,
        flexDirection:"row",
        backgroundColor:"white",
        padding:15,
        justifyContent:"space-between",
        alignItems:"center"
    },
    messageSubContainer:{
        flexDirection:"row",
        width:"90%"
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
        borderBottomColor: colors.lightViolet,
        borderBottomWidth: 0.3,
        width: widths.width,
        marginBottom:10,
    },
    
   
});
export default MessageCardStyle;