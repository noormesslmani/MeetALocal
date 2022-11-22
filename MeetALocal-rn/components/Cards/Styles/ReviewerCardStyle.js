import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
import { colors } from "../../../constants/colors";
const ReviewerCardStyle = StyleSheet.create({
    cotainer:{
        width: widths.width9, 
        padding:20,
        marginBottom:10,
        height:'auto',
        shadowColor: "#000",
        backgroundColor:"white",
        borderRadius:10,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    imageContianer:{
        flexDirection:"row",
        alignItems:"center"
      
    },
    image:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight:4,
        alignItems:"center",
    },
    name:{
        fontSize:12,
        fontWeight:"600",
        margin:4
    },
    stars:{
        fontSize:11,
        color: colors.violet,
        margin:4
    },
    review:{
        fontSize:11,
    },
    separator:{
        width:widths.width8,
        height:0.1,
        backgroundColor: 'grey',
        marginVertical:10

    },
    trash:{
        position:'absolute',
        right:10,
        top:10
    }
   
});
export default ReviewerCardStyle;