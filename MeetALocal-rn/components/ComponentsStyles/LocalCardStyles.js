import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LocalCardStyles = StyleSheet.create({
    card:{
        marginTop:40,
        width: windowWidth,
        alignItems:"center"
    },
    image:{
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        width: 0.8*windowWidth,
        height: 0.3*windowHeight,
        position: "relative"
    },
    infoContainer:{
        width: 0.8*windowWidth,
        height: 0.07*windowHeight,
        backgroundColor:"rgba(217, 217, 217, 0.75)",
        position:'absolute',
        top: 0.23*windowHeight,
        alignItems:"center",
        justifyContent:"center"
    },
    name:{
        fontSize:15,
        fontWeight:"500"
    },
    country:{
        fontSize:12
    },
    likes:{
        fontSize:10
    },
    fees:{
        position:'absolute',
        right:0.12*windowWidth,
        top: 0.25*windowHeight
    },
    categoryContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width: 0.8*windowWidth,
        height: 0.07*windowHeight,
        backgroundColor:"rgba(140, 87, 186, 0.25)",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
   
});
export default LocalCardStyles;