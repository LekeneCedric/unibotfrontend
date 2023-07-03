import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import Colors from "../../../shared/theme/colors";
import colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container: {
    padding: wp('2%'),
    height: '100%',
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
  scrollview: {
    height: hp('78%'),
    flexGrow: 1
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
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
});
export { pickerSelectStyles, styles };
