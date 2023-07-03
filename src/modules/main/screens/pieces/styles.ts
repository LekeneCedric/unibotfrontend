import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import Colors from "../../../shared/theme/colors";
import colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container: {
    padding: wp('2%'),
    flexGrow: 1
  },
  headerFilter: {
    marginRight: wp('2%'),
  },
  filterModal: {
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
    // marginTop: hp('20%'),
    height: hp('100%'),
  },
  filterModalContainer: {
    padding: wp('2%'),
    height: '100%',
  },
  filterModalContainerTitle: {
    fontSize: fontSize.smallTitle,
    fontFamily: fontFamily.ysabeauBold,
    marginTop: wp('2%'),
    marginBottom: wp('2%'),
  },
  categorieContainer: {
    padding: wp('2%'),
    marginRight: wp('1%'),
    marginBottom: hp('1%'),
    borderRadius: wp('4%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems:'center',
  },
  categorieText: {
    fontFamily: fontFamily.ysabeauBold,
  },
  scrollview: {
    flexGrow: 1,
  },
  loadContainer: {
    alignItems: 'center'
  },
  searchBar: {
    backgroundColor: Colors.secondary,
    fontFamily: fontFamily.ysabeauMedium,
    marginBottom: wp('3%'),
  },
  searchBarInput: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.text
  },
  fab: {
    color: Colors.light,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.primary,
    bottom: hp('2%'),
    right: wp('2%'),
  }
});
export default styles;
