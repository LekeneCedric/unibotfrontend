import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  languageContainer:{
    position:'absolute',
    alignItems:'center',
    top:hp('2%'),
    flexDirection:'row'
  },
  textLang:{
    color:'black'
  },
});
export default styles;
