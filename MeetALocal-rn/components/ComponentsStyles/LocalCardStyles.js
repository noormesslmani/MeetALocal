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
        width: 0.9*windowWidth,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    image:{
        borderTopEndRadius:10,
        borderTopRightRadius:10,
        width: 0.9*windowWidth,
        height: 0.4*windowHeight,
        position: "relative",
    },
    infoContainer:{
        width: 0.9*windowWidth,
        height: 0.09*windowHeight,
        backgroundColor:"rgba(217, 217, 217, 0.65)",
        position:'absolute',
        bottom:0.09*windowHeight,
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
        bottom: 0.12*windowHeight
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
        width: 0.9*windowWidth,
        height: 0.09*windowHeight,
        backgroundColor:"rgba(140, 87, 186, 0.25)",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
    CategorySubcontainer:{
        margin:10,
        alignItems:"center",
        justifyContent:"center"
    },
    iconLabel:{
        fontSize:12,
        color:"white",
        fontWeight:"600",
    }

});
export default LocalCardStyles;