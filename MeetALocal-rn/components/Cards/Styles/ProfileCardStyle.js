import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const ProfileCardStyle = StyleSheet.create({
    card:{
        width:widths.width9,
        height:'auto',
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"white",
        borderRadius:10,
        padding:20,
        marginVertical:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    data:{
        fontSize:16,
        fontWeight:"500",
        marginHorizontal:10
    },
    arr:{
        fontSize:14,
        fontWeight:"500",
        marginLeft:10
    },
    about:{
        fontWeight:"400",
        fontSize:14,
    }
   
});
export default ProfileCardStyle;