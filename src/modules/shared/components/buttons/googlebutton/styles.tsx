import { StyleSheet } from "react-native";
import Colors from "../../../theme/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../theme/fontFamily";

const styles = StyleSheet.create({
  button:{
    backgroundColor:Colors.light,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop:hp('2%'),
    alignItems:'center',
    justifyContent:'center',
    padding:wp('4%'),
    borderRadius:wp('2%'),
    flexDirection:'row'
  },
  buttonText:{
    marginLeft:wp('2%'),
    fontFamily: fontFamily.ysabeauText
  },
});
export default styles;
