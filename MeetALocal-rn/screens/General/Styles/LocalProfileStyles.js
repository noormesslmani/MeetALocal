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
        width:0.9*windowWidth,
        flexDirection:"row",
        marginBottom:30
    },
    infoContainer:{
        width:0.9*windowWidth,
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
    },
    separator:{
        width:0.9*windowWidth,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        marginBottom:20,
    },
    about:{
        width:0.9*windowWidth,
        marginBottom:20
    },
    iconContainer:{
        alignItems:"center",
        marginTop:20,
        marginRight:25,
        flexWrap:"wrap"
    }

});
export default LocalProfileStyles;