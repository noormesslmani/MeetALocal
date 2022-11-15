import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";

const ScheduleStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        paddingVertical:40,
        width:widths.width,
    },
    list:{
        width:widths.width9,
    },
});
export default ScheduleStyles;