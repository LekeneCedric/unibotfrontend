import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../../shared/theme/colors";
import fontFamily from "../../../shared/theme/fontFamily";
import colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    paddingLeft: wp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin:hp('1%'),
    alignItems:'center',
    borderRadius:wp('2%'),
    flexDirection:'row'
  },
  content: {
    padding: wp('2%')
  },
  title: {
    fontFamily: fontFamily.ysabeauBold
  },
  description: {

  },
  icon1: {
    left: 0
  },
  icon2: {
    position:'absolute',
    right: 0
  }
});
export default styles;
