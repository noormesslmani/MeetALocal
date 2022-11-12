import { StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get("window").width;
import { widths } from "../../constants/dimensions";
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        width: windowWidth,
        paddingRight:25,
        flexDirection:"row",
        justifyContent:"center",
    },
    headerContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:0.9*windowWidth,
    },
    halfWidth:{
        width:0.55*windowWidth,
    },
    logo:{
        width: widths.width6, 
        height: 80,
        zIndex:20
    }
})
export default styles;