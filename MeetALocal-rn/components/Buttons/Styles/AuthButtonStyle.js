import { StyleSheet} from "react-native";
import { colors } from "../../../constants/colors";
const AuthButtonStyle = StyleSheet.create({
    button1:{
        width:120,
        height: 40,
        borderRadius: 10,
        borderColor: colors.violet,
        borderWidth:1,
        backgroundColor:'white',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    button2:{
        width:150,
        height: 50,
        borderRadius: 20,
        borderColor: colors.violet,
        borderWidth:1,
        backgroundColor:'white',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    button3:{
        width:120,
        height: 40,
        borderRadius: 10,
        backgroundColor:colors.lightViolet,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

})
export default AuthButtonStyle;