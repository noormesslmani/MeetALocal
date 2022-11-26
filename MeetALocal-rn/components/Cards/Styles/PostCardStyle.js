import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";

const windowHeight = Dimensions.get("window").height;
const PostCardStyle = StyleSheet.create({
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
        margin:2,
        fontWeight:"300"
    },
    details:{
        fontSize:12, 
        marginLeft:70, 
        fontWeight:"300", 
        alignSelf:"flex-start",
        marginBottom:10
    },
    userInfo:{
        flexDirection:'row',
        justifyContent:"space-between",
        width:widths.width7,
        alignItems:"center"
    },
    postDetails:{
        fontSize:12, 
        marginLeft:10, 
        marginVertical:4,
        fontWeight:"300", 
        alignSelf:"flex-start",
        width:widths.width7,
        overflow:"hidden"
    },
    name:{
        fontSize:14, 
        marginLeft:10, 
        fontWeight:"600"
    },
    country:{
        fontSize:11, 
        marginLeft:10
    },
    date:{
        fontSize:9
    }
   
});
export default PostCardStyle;