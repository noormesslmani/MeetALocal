import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
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
        height: 'auto',
        width: widths.width5,
        overflow: 'hidden',
        padding:5,
        },
        card_image: {
            width: '100%',
            height: 120,
            borderRadius:10
        },
        title: {
            fontSize: 16, 
            fontWeight:"700",
        },
        country: {
            fontSize:13,
            color: colors.violet
        },
        card_inner_view: {
            borderRadius:15
        },
   
});
export default MapCardStyle;