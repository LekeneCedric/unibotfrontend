import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import Colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container: {
    padding: wp('2%'),
    flexGrow:1
  },
  loadContainer: {
    alignItems:'center'
  },
  searchBar: {
    fontFamily: fontFamily.ysabeauMedium,
    marginBottom: wp('3%'),
  },
  searchBarInput: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.text
  },
  fab: {
    color:Colors.light,
    position: 'absolute',
    zIndex:10,
    backgroundColor: Colors.primary,
    bottom: hp('2%'),
    right: wp('2%'),
  }
});
export default styles;
