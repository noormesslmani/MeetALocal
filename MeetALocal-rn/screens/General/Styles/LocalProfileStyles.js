import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LocalProfileStyles = StyleSheet.create({
    mainContainer:{
        width: windowWidth,
        padding:30,
        alignItems:"center"
    },
    imageContainer:{
        width:0.8*windowWidth,
        flexDirection:"row",
        marginBottom:50
    },
    infoContainer:{
        width:0.8*windowWidth,
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:20
    },
    image:{
        width:120,
        height:120,
        borderRadius:60
    },
    message:{
        backgroundColor:"#8C57BA",
        width:80,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    }

});
export default LocalProfileStyles;