import { StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
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
        width: 200, 
        height: 80
    }
})
export default styles;