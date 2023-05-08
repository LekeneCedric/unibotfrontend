import React from "react";
import { TouchableOpacity, View } from "react-native";
import IRequestRequire from "../../../../../../models/request/request.require.model";
import styles from "./styles";
import Text from "../../../../../shared/components/native/text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
import Colors from "../../../../../shared/theme/colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

interface props extends IRequestRequire
{}
const toDownloadDocument : React.FC<props> = ({type_piece_id,name,body}) => {
  const navigation = useNavigation();
  return <View style={styles.container}>
    <View style={styles.row}>
      <Icon name={Icons.MAIN.REQUESTS.DOCUMENT} size={widthPercentageToDP('7%')} color={Colors.primary}/>
      <Text style={styles.docName}>{name}</Text>
    </View>
    <TouchableOpacity onPress={()=>{
      if(body==null)
      {
        //@ts-ignore
        navigation.navigate('new_piece',{piece_id:type_piece_id,name:name});
      }
    }}>
      <Icon name={body!=null?Icons.MAIN.REQUESTS.check:Icons.MAIN.REQUESTS.notfind}
            size={widthPercentageToDP('5%')}
            color={body!=null?Colors.success:Colors.danger}/>
    </TouchableOpacity>

  </View>
};
export default toDownloadDocument;
