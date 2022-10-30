import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const HomeStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20
    },
    welcome:{
        fontSize:45,
        color:"#8C57BA",
    },
    name:{
        fontSize:20,
        margin:5,
    },
    photo:{
        width: 0.4*windowWidth,
        height: 0.4*windowWidth,
        borderRadius: 0.2*windowWidth,
        margin:15
    },
    cardContainer:{
        alignItems:"center",
    },
    cardItems:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"60%"
    },
    card:{
        backgroundColor:"rgba(140, 87, 186, 0.34)",
        width: 0.7*windowWidth,
        height: 0.12*windowHeight,
        borderRadius:10,
        margin:5,
        alignItems:"center",
        justifyContent:"center"
    },
    label:{
        fontSize:30,
        color:"white",
        fontWeight:'900'
    }
   
});

export default HomeStyles;