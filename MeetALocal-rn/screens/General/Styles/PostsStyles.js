import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;

const PostsStyles = StyleSheet.create({
    view:{
        flexDirection:"row",
        width:widths.width6,
        justifyContent:"space-between",
    },
    title:{
       fontSize:22,
       margin:10,
    },
    options:{
        fontSize:18,
        marginTop:10,
        marginBottom:25,
    },
    selected:{
        color:colors.violet
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: widths.width9,
        marginBottom:10,
    },
    list:{
        width:widths.width,
        flex: 1
    },
    scrollContainer:{
        height:600,
    },
    addComment:{
        backgroundColor:"white",
        height:50,
        justifyContent:"center",
        padding:5,
        position:"absolute",
        top:windowHeight-150,
        width:widths.width
    },
    newPost:{
        margin:10,
        fontSize:12,
        color:colors.violet
    }
});
export default PostsStyles;