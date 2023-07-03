import React, { useEffect } from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../../../../../shared/theme/colors";

const PreviewPiece:React.FC<{}> = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const {uri,type} = route.params;
  useEffect(()=>{
    console.warn(uri);
  },[])
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <TouchableOpacity onPress={()=>{navigation.goBack();}} style={styles.icon}>
        <Icon color={colors.black} name={Icons.back} size={widthPercentageToDP('10%')} />
      </TouchableOpacity>
      {
        type === 'pdf' ?
        (
          <></>
        )
        :
        (
        <Image style={styles.image} source={{ uri }} />
        )
      }
    </View>
  )
};
export default PreviewPiece;
