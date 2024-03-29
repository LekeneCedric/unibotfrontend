import { StyleSheet } from "react-native";
import Colors from "../../../../shared/theme/colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import fontFamily from "../../../../shared/theme/fontFamily";
import fontSize from "../../../../shared/theme/fontSize";

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems:'center',
    marginTop:hp('1%'),
    margin:wp('3%'),
    padding:wp('0%'),
    width:wp('80%'),
    backgroundColor:Colors.light,
    borderRadius:wp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  textInput:{
    width:'90%',
    color:Colors.primary,
    fontFamily:fontFamily.ysabeauMedium,
    textDecorationStyle:undefined,
    fontSize:fontSize.text,
  },
  seeIconButton:{

  }
});
export default styles;
