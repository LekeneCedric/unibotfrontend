import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../../../../shared/theme/colors";
import fontFamily from "../../../../../shared/theme/fontFamily";
const styles = StyleSheet.create({
  container: {
    padding:wp('2%'),
    flex: 1,
  },
  loadContainer: {
    alignItems:'center'
  },
  section: {
    padding: wp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    marginBottom: hp('1%')
  },
  title: {
    fontFamily: fontFamily.ysabeauBold,
  },
  item: {
    marginLeft : wp('2%'),
  },
  inputsContainers: {
    width: "100%",
  },
  label: {
    fontFamily: fontFamily.ysabeauText,
  },
  fab: {
    color:Colors.light,
    position: 'absolute',
    zIndex:1,
    backgroundColor: Colors.primary,
    bottom: hp('3%'),
    right: wp('2%'),
  }
});
export default styles;
