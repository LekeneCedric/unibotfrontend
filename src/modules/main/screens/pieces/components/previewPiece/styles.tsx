import { StyleSheet } from "react-native";
import Colors from "../../../../../shared/theme/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor:Colors.black
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000000,
    width: wp('10%'),
    height: hp('5%'),
    borderRadius: wp('10%'),
    backgroundColor: Colors.light,
    top:hp('2%'),
    left:wp('2%'),
  },
  image: {
    width:wp('100%'),
    height:hp('100%'),
  }
});
export default styles;
