import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../constants/dimensions";

const windowHeight = Dimensions.get("window").height;
const PostCardStyles = StyleSheet.create({
    card:{
        alignSelf:"center",
        marginTop:15,
        width: widths.width9,
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
        elevation: 3,
        borderRadius:20,
        padding:10,
        overflow:"hidden"
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:widths.width9,
        padding:10,
        paddingBottom:0
    },
    image:{
        width:50,
        height:50,
        borderRadius:25
    },
    list:{
        width:widths.width,
        flex: 1,
    },
    cardsContainer:{
        width:widths.width,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    commentsContainer:{
        position:"absolute",
        top:"98%",
        left:"93%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    comments:{
        fontSize:11, 
        fontWeight:"300", 
        margin:2,
        fontWeight:"100"
    },
    details:{
        fontSize:11, 
        marginLeft:70, 
        fontWeight:"300", 
        alignSelf:"flex-start",
        marginBottom:10
    },
    postDetails:{
        fontSize:11, 
        marginLeft:10, 
        fontWeight:"200", 
        alignSelf:"flex-start",
        width:widths.width7
    }
   
});
export default PostCardStyles;