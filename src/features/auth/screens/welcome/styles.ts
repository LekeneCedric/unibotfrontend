import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: hp('5%'),
    padding: hp('2.5%'),
    backgroundColor: Colors.light,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  button1: {
    padding: wp('0.2%'),
    alignItems: 'center',
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: wp('1.5%'),
    width: '40%',
    backgroundColor: Colors.light,
    borderRadius: 100,
  },
  button2: {
    padding: wp('0.2%'),
    alignItems: 'center',
    color: Colors.light,
    fontWeight: 'bold',
    fontSize: wp('1.5%'),
    width: '40%',
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  textButton: {
    // fontSize: moderateScale(15),
  },
  presentation: {
    position: 'relative',
    bottom: hp('0.7%'),
    left: wp('0.2%'),
  },
  // logo:{
  //   alignSelf:'center',
  //   width : wp(350),
  //   height : verticalScale(350)
  // },
  buttons: {
    marginTop: hp('0.2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
