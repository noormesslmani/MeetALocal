import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";

const ListHeaderStyle = StyleSheet.create({
    iconsContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        alignSelf:"center"
    },
    filters:{
        alignItems:"center",
        marginHorizontal:40
    },
    filterText:{
        fontSize:10,
        marginTop:3,
        color:'grey'
    }

});
export default ListHeaderStyle;