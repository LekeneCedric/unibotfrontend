import { StyleSheet } from "react-native";
import Colors from "../../../../../shared/theme/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.black
  },
  image: {
    width:wp('100%'),
    height:hp('100%'),
  }
});
export default styles;
