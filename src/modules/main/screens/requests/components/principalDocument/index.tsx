import { Linking, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../../../../shared/theme/colors";
import Text from "../../../../../shared/components/native/text";
import React, { useEffect } from "react";
import { storageBackend } from "../../../../../../api/methods";

interface props
{
  name: string,
  path: string
}
const PrincipalDocument : React.FC<props> = ({name,path})=>
{
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>{
        const url =`${storageBackend}/${path}`;
        Linking.openURL(url);
      }}
    >
      <View style={styles.row}>
        <Icon name={Icons.MAIN.REQUESTS.DOCUMENT} size={widthPercentageToDP('7%')} color={Colors.primary}/>
        <Text style={styles.docName}>{name}</Text>
      </View>
      <TouchableOpacity>
        <Icon name={path!==null? Icons.MAIN.REQUESTS.check:Icons.MAIN.REQUESTS.notfind}
              size={widthPercentageToDP('5%')}
              color={path!==null? Colors.success:Colors.danger}/>
      </TouchableOpacity>

    </TouchableOpacity>
  )
}
export default PrincipalDocument;
