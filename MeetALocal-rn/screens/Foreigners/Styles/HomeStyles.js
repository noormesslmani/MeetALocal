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
        width: 0.5*windowWidth,
        height: 0.5*windowWidth,
        borderRadius: 0.25*windowWidth,
        margin:20
    },
    cardContainer:{
        alignItems:"center",
        width: 0.8*windowWidth,
        height: 0.2*windowHeight,
    },
    card:{
        backgroundColor:"rgba(140, 87, 186, 0.34)"
    }
});

export default HomeStyles;