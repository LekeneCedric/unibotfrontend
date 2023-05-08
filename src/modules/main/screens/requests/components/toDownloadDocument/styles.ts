import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../../../shared/theme/fontFamily";
import fontSize from "../../../../../shared/theme/fontSize";
import Colors from "../../../../../shared/theme/colors";

const styles = StyleSheet.create({
 container : {
  width: wp('90%'),
  padding: wp('2%'),
   borderBottomEndRadius:wp('2%'),
   borderBottomLeftRadius:wp('2%'),
   borderBottomColor:Colors.gray,
   borderBottomWidth:1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  docName: {
   fontFamily: fontFamily.ysabeauBold,
    fontSize: fontSize.text,
    marginLeft: wp('2%')
  }
});
export default styles;
