import { StyleSheet } from "react-native";
import Colors from "../../../theme/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../theme/fontFamily";

const styles = StyleSheet.create({
  button:{
    backgroundColor:Colors.primary,
    marginTop:hp('5%'),
    width:'100%',
    alignItems:'center',
    padding:wp('4%'),
    borderRadius:wp('2%')

  },
  buttonText:{
    fontFamily: fontFamily.ysabeauText,
    color:Colors.light
  },
});
export default styles;
