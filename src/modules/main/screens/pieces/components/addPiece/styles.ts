import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Colors from "../../../../../shared/theme/colors";
import fontFamily from "../../../../../shared/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  intitule: {
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    fontFamily: fontFamily.ysabeauBold,
  },
  pickerContainer: {
    padding: wp('1%'),
    width: wp('90%'),
    fontFamily: fontFamily.ysabeauText,
    backgroundColor: Colors.light,
    borderRadius: wp('2%'),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  documentPreview: {
    width: widthPercentageToDP('30%'),
    height: heightPercentageToDP('30%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderRadius: 10
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: wp('90%'),
    fontFamily: fontFamily.ysabeauText,
    backgroundColor: Colors.light,
    borderRadius: wp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontFamily: fontFamily.ysabeauText,
    color: Colors.light
  },
  validationButton: {
    width: wp('80%'),
    backgroundColor: Colors.primary,
    marginTop: hp('5%'),
    alignItems: 'center',
    padding: wp('4%'),
    borderRadius: wp('2%')
  },
  uploadText: {
    fontFamily: fontFamily.ysabeauBold,
  },
  picker: {
    fontFamily: fontFamily.ysabeauText,
    color: Colors.primary
  },
  pickerItem: {
    fontFamily: fontFamily.ysabeauText,
  }
});
export default styles;
