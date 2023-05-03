import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../shared/theme/icon";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../../shared/theme/colors";
import Text from "../../../shared/components/native/text";

type props = {
  title: string,
  description: string,
  icon: string,
  backgroundColor?: string,
  textColor?:string,
  func?:()=>void,
}
const SettingsItem: React.FC<props> = ({title,description,icon,backgroundColor,textColor,func})=>{
  return (
    <TouchableOpacity style={[styles.container,{backgroundColor: backgroundColor?backgroundColor:Colors.light}]} onPress={func}>
      <Icon style={styles.icon1} name={icon} size={widthPercentageToDP('7%')} color={textColor?textColor:Colors.primary}/>
      <View style={styles.content}>
        <Text style={[styles.title,{color:textColor?textColor:Colors.primary}]}>{title}</Text>
        <Text style={[styles.description,{color:textColor?textColor:Colors.primary}]}>{description}</Text>
      </View>
      <Icon style={styles.icon2} name={Icons.next} size={widthPercentageToDP('7%')} color={textColor?textColor:Colors.primary}/>
    </TouchableOpacity>
  );
}
export default SettingsItem;
