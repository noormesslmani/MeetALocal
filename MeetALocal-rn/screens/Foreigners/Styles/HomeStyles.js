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
});

export default HomeStyles;