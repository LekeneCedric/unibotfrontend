import React from "react";
import styles from "./styles";
import Colors from "../../../shared/theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { TouchableOpacity, View } from "react-native";
import Text from "../../../shared/components/native/text";
import Icons from "../../../shared/theme/icon";
import IPiece from "../../../../models/piece.model";

interface props extends IPiece{
}
const PieceItem:React.FC<props> = ({name,type,media})=>{
  return (
    <View style={styles.container}>
      <Icon style={styles.icon1} name={Icons.MAIN.PIECES.DOCUMENT} size={widthPercentageToDP('7%')} color={Colors.primary}/>
      <View style={styles.content}>
        <Text style={[styles.title]}>{name}</Text>
      </View>
      <View style={styles.iconRightContainer}>
        <TouchableOpacity>
          <Icon name={Icons.MAIN.PIECES.SEE} size={widthPercentageToDP('6%')} color={Colors.primary}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:widthPercentageToDP('2%')}}>
          <Icon name={Icons.MAIN.PIECES.DELETE} size={widthPercentageToDP('6%')} color={Colors.danger}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};
export default PieceItem;
