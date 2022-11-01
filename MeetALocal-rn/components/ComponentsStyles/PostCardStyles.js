import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const PostCardStyles = StyleSheet.create({
    card:{
        marginTop:40,
        width: 0.9*windowWidth,
        alignItems:"center",
        height:0.17*windowHeight,
        backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderRadius:20,
        padding:10
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:0.9*windowWidth,
        paddingLeft:10,
        paddingRight:10
    },
    image:{
        width:50,
        height:50,
        borderRadius:25
    }
    
   
});
export default PostCardStyles;