import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../../shared/theme/colors';
import fontSize from "../../../shared/theme/fontSize";
import fontFamily from "../../../shared/theme/fontFamily";

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:wp('5%'),
    alignItems:'center'
  },
  botImage:{
    marginTop:hp('2%'),
    // backgroundColor:'gray',
    width:wp('90%'),
    height:hp('50%')
  },
  container2:{
    position:'absolute',
    alignItems:'center',
    bottom:hp('10%')
  },
  title:{
    fontFamily: fontFamily.ysabeauBold,
    fontSize:fontSize.mediumTitle,
    marginBottom:hp('2%')
  },
  description:{
    fontFamily: fontFamily.ysabeauMedium,
    textAlign:'center'
  },
  button:{
    backgroundColor:Colors.primary,
    marginTop:hp('5%'),
    width:'100%',
    alignItems:'center',
    padding:wp('4%'),
    borderRadius:wp('2%')

  },
  buttonText:{
    fontFamily: fontFamily.ysabeauMedium,
    color:Colors.light
  }
});
export default styles;
