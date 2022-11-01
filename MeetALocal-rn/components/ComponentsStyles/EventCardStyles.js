import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EventCardStyles = StyleSheet.create({
    cardContainer:{
        margin:5,
        marginTop:40,
        borderRadius:20,
        width:0.43*windowWidth,
        height:0.43*windowWidth,
        backgroundColor:'white',
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
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        width:0.43*windowWidth,
        height: 0.3*windowWidth,
    },
    title:{
        fontSize:15,
        marginLeft:7
    },
    info:{
        fontSize:10,
        marginLeft:7,
        marginRight:7
    }
});
export default EventCardStyles;