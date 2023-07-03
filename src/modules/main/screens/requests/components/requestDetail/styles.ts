import { StyleSheet } from "react-native";
import Colors from "../../../../../shared/theme/colors";
import fontFamily from "../../../../../shared/theme/fontFamily";
import fontSize from "../../../../../shared/theme/fontSize";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: widthPercentageToDP('4%')
  },
  textLoader: {
    color: Colors.primary,
    fontFamily: fontFamily.ysabeauMedium
  },
  title: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.text
  },
  labelTitle: {
    alignSelf:'baseline',
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.smallTitle
  },
  description: {
    textAlign: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textwarning: {
    marginTop: heightPercentageToDP('2%'),
    textAlign: 'center',

  }
});
export default styles;
