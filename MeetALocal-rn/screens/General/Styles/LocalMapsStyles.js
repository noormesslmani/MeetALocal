import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const LocalsMapStyles = StyleSheet.create({
      mapContainer:{
        width:widths.width,
        alignItems:"center",
        backgroundColor:"white",
        justifyContent:"space-between"
      },
      map:{
        alignSelf:"flex-end",
        width:"100%",
        height:"100%",
      },
      title:{
        color:colors.violet,
        fontSize:22,
      },
      close:{
        position:"absolute",
        left:"100%",
        top:"4%"
      },
      search:{
        width:"100%",
        flex: 1,
        padding: 10,
        backgroundColor: '#ecf0f1',
      },
      searchContainer: {
        width:"90%",
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position:"absolute"}
     
});
export default LocalsMapStyles;