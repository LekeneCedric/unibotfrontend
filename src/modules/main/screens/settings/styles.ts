import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from "react-native-responsive-screen";
import fontSize from "../../../shared/theme/fontSize";
import fontFamily from "../../../shared/theme/fontFamily";
import Colors from "../../../shared/theme/colors";

const styles = StyleSheet.create({
  settingsContainer: {
    padding: wp('4%'),
    paddingLeft: wp('2%'),
    backgroundColor: Colors.light,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin:hp('1%'),
    borderRadius:wp('2%'),
    flexDirection:'column',

  },
  container: {
    backgroundColor: Colors.light,
    padding: wp('1%'),
    flex: 1,
  },
  presentation: {
    alignItems: "center"
  },
  username: {
    fontSize: fontSize.smallTitle,
    fontFamily: fontFamily.ysabeauBold
  },
  row: {
    flexDirection: "row",
  },
  matricule: {
    color: Colors.gray
  },
  editButtonContainer: {
    marginTop: -hp('2%')
  },
  scrollView: {
    marginTop: hp('2%')
  }
});
export default styles;
