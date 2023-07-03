import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../shared/theme/fontFamily";
import Colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    padding: wp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: hp('1%'),
    alignItems: 'center',
    borderRadius: wp('2%'),
    flexDirection: 'row'
  },
  typePiece: {
    fontFamily: fontFamily.ysabeauText,
    color: Colors.gray
  },
  iconRightContainer: {
    position: 'absolute',
    right: 0,
    width: wp('30%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    padding: wp('2%'),
    flexDirection: 'column'
  },
  title: {
    fontFamily: fontFamily.ysabeauText
  },
  description: {

  },
  icon1: {
    left: 0
  },
  icon2: {

  }
});
export default styles;
