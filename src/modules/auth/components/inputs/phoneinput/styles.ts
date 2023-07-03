import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../../../shared/theme/colors";
import fontSize from "../../../../shared/theme/fontSize";
import fontFamily from "../../../../shared/theme/fontFamily";
import { RFPercentage } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    marginTop: hp('1%'),
    margin: wp('3%'),
    padding: wp('0%'),
    width: wp('80%'),
    backgroundColor: Colors.light,
    borderRadius: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  codeContainer: {
    padding: wp('1%'),
    borderRightWidth: 1,
    borderRightColor: Colors.primary
  },
  inputElement: {
    color: Colors.primary
  },
  textInput: {
    fontSize:fontSize.text,
    color:Colors.primary,
    fontFamily:fontFamily.ysabeauMedium,
    textDecorationStyle:undefined
  },
  countryName: {
    color: Colors.black,
    fontSize: RFPercentage(2.5),
    fontFamily: fontFamily.ysabeauText
  },
  SelectCodeItem: {
    color: Colors.black
  }
});
export default styles;
