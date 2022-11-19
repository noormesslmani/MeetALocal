import { StyleSheet, Dimensions } from "react-native";

const EmptyPageStyle = StyleSheet.create({
    container:{
        alignItems:"center", 
        justifyContent:"center", 
        position:"absolute", top:"50%"
    },
    text:{
        fontSize:18, 
        color:"grey",
        marginVertical:10
    }
});
export default EmptyPageStyle;