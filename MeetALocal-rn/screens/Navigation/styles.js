import { StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        width: windowWidth,
        paddingRight:25
    },
    logo:{
        width: 300, 
        height: 100
    }
})
export default styles;