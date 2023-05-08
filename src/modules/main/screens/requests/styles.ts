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
  scrollview: {
    height: hp('78%')
  },
  searchBar: {
    fontFamily: fontFamily.ysabeauMedium,
    marginBottom: wp('3%'),
  },
  searchBarInput: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.text
  },
  requests: {

  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  sectionItem:{
    marginBottom:hp('2%'),
    padding:wp('3%'),
    marginRight:wp('2%'),
    borderRadius:wp('5%'),
  },
  sectionTitle: {
    fontFamily:fontFamily.ysabeauMedium,
  }

});
export default styles;
