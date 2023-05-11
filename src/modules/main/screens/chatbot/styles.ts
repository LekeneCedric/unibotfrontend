import { StyleSheet } from "react-native";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import Colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  quickReplyTextStyle: {
    fontFamily:fontFamily.ysabeauMedium,
    fontSize: fontSize.text,
    color: Colors.black
  }
});
export default styles;
