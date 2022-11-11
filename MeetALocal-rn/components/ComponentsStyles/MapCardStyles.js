import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../constants/dimensions";
import { colors } from "../../constants/colors";
import { color } from "react-native-reanimated";
const MapCardStyles = StyleSheet.create({
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
        height: 200,
        width: 250,
        overflow: 'hidden'
        },
        card_image: {
            width: 250,
            height: 140,
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
export default MapCardStyles;