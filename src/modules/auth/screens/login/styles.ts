import {StyleSheet} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import Colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:wp('5%'),
    alignItems:'center'
  },
  header:{
    marginTop:hp('5%'),
    alignItems:'center'
  },
  middle:{
    marginTop:hp('8%'),
  },
  bottom:{
    width:wp('80%'),
    marginTop:hp('8%')
  },
  welcomeTitle:{
    fontFamily:fontFamily.ysabeauBold,
    fontSize:fontSize.mediumTitle
  },
  welcomeDetail:{

  },
  forgetPassText:{
    textAlign:'right'
  },
  forgetPassButton:{
    marginTop:hp('1%')
  },
  already:{
    marginTop:hp('1%'),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
  },
  signInLink:{
    marginLeft:wp('2%'),
    color:Colors.primary
  }
});
export default styles;
