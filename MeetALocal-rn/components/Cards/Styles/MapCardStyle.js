import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
const MapCardStyle = StyleSheet.create({
        card_scroll_view: {
        position:'absolute',
        bottom:10,
        left:10,
        right:0,
        paddingVertical:8
        },
        card_view: {
        elevation:90,
        backgroundColor:'white',
        borderRadius:10,
        marginHorizontal: 10,
        height: 180,
        width: 200,
        overflow: 'hidden'
        },
        card_image: {
            width: 200,
            height: 120,
        },
        title: {
            fontSize: 16, 
            fontWeight:"700",
        },
        country: {
            fontSize:12,
            color: colors.violet
        },
        card_inner_view: {
            borderRadius:15
        },
   
});
export default MapCardStyle;