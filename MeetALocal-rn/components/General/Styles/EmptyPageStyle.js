import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const EmptyPageStyle = StyleSheet.create({
    container:{
        alignItems:"center", 
        justifyContent:"center", 
        position:"absolute",
        top:'50%',
        left:0,
        right:0,
    },
    text:{
        fontSize:18, 
        color:"grey",
        marginVertical:10
    }
});
export default EmptyPageStyle;