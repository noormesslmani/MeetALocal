import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LocalCardStyles = StyleSheet.create({
    container:{
        marginTop:40,
        alignItems:"center",
        width:windowWidth, 
    },
    card:{
        width: 0.8*windowWidth,
        height: 0.4*windowHeight,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    image:{
        borderRadius:10,
        width: 0.8*windowWidth,
        height: 0.4*windowHeight,
        position: "relative",
    },
    infoContainer:{
        width: 0.8*windowWidth,
        height: 0.09*windowHeight,
        backgroundColor:"rgba(217, 217, 217, 0.75)",
        position:'absolute',
        bottom:0,
        alignItems:"center",
        justifyContent:"center"
    },
    name:{
        fontSize:14,
        fontWeight:"500"
    },
    country:{
        fontSize:13,
    },
    feesContainer:{
        position:'absolute',
        left:5,
        bottom: 0.035*windowHeight
    },
    likesContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginTop:2
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