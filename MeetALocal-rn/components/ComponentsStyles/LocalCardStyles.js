import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const LocalCardStyles = StyleSheet.create({
    container:{
        marginTop:40,
        alignItems:"center",
        width:widths.width, 
    },
    card:{
        width: widths.width9,
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
        width: widths.width9,
        height: 0.4*windowHeight,
        position: "relative",
    },
    infoContainer:{
        width:widths.width9,
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
        width: widths.width9,
        height: 0.09*windowHeight,
        backgroundColor: colors.lighterViolet,
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