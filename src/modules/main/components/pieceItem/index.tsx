import React, { useEffect, useState } from "react";
import styles from "./styles";
import Colors from "../../../shared/theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Linking, TouchableOpacity, View } from "react-native";
import Text from "../../../shared/components/native/text";
import Icons from "../../../shared/theme/icon";
import IPiece from "../../../../models/piece.model";
import { DELETE, storageBackend } from "../../../../api/methods";
import ROUTES from "../../../../api/routes";
import { removePiece } from "../../../../redux/reducers/pieceSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../shared/theme/colors";
import moment from "moment/moment";
import downloadFiles from "../../../shared/utils/downloadFile";
import { useTranslation } from "react-i18next";

interface props extends IPiece{
}
const PieceItem:React.FC<props> = ({ id ,name, media,created_at})=>{
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [token,setToken] = useState(useAppSelector(state=>state.auth.userToken));
  const [showAlert,setShowAlert] = useState(false);
  const [parseDate,setParseDate] = useState('');
  const {t, i18n} = useTranslation();
  const currentLang = i18n.language;
  const deletePiece = (id:number)=>{
    DELETE(`${ROUTES.V1.USER.PIECE.DELETE}`,id,token)
      .then(res=>
      {
        {
          if (!res.ok) {
            if (res.status===500) {
              throw new Error('Internal Server Error');
            }
            else if ([400,401,403,404].includes(res.status))
            {
              throw new Error('error occur when try to delete');
            }
            else {
              throw new Error('Network response was not ok');
            }
          }
          return res.json();
        }

      })
      .then(res=>{
        // console.warn(res);
        dispatch(removePiece(id));
      })
      .catch(err=>{
        console.warn(err);
      })
      .finally(()=>{});
  }
  useEffect(()=>{
    setParseDate(`${new Date(created_at!).getDay()+1}/ ${new Date(created_at!).getMonth()} / ${new Date(created_at!).getFullYear()}`);
  },[]);
  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        title={currentLang === 'en' ? 'Delete' : 'Supprimer'}
        message={currentLang === 'en' ? 'Would you delete this piece ?' : 'Voulez vous supprimer cette piece ?'}
        showCancelButton={true}
        showConfirmButton={true}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        onCancelPressed={()=>{setShowAlert(false)}}
        onConfirmPressed={()=>{deletePiece(id!);setShowAlert(false)}}
        confirmButtonColor={Colors.danger}
      />
      <Icon style={styles.icon1} name={Icons.MAIN.PIECES.DOCUMENT} size={widthPercentageToDP('7%')} color={Colors.primary}/>
      <View style={styles.content}>
        <Text style={[styles.title]}>{name}</Text>
        <Text style={styles.typePiece}>{moment(parseDate,'DD/MM/YYYY').format('MMMM Do YYYY')}</Text>
      </View>
      <View style={styles.iconRightContainer}>
        <TouchableOpacity onPress={() => {
          downloadFiles([`${media.filePath.slice(1)}`], '').then(() => {})
        }}>
          <Icon name={'download'} size={widthPercentageToDP('6%')} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => {
          if (media.filePath.includes('pdf')) {
            const url =`${storageBackend}${media.filePath}`;
            Linking.openURL(url)
          } else {
            //@ts-ignore
            navigation.navigate('preview_document', { uri: `${storageBackend}${media.filePath}`, type: "image/png" })
          }
        }}>
          <Icon name={Icons.MAIN.PIECES.SEE} size={widthPercentageToDP('6%')} color={Colors.primary}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight:widthPercentageToDP('2%')}}
          onPress={()=>{setShowAlert(true)}}>
          <Icon name={Icons.MAIN.PIECES.DELETE} size={widthPercentageToDP('6%')} color={Colors.danger}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};
export default PieceItem;
