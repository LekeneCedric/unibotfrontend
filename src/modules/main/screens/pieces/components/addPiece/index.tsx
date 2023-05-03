import { ActivityIndicator, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import fontFamily from "../../../../../shared/theme/fontFamily";
import fontSize from "../../../../../shared/theme/fontSize";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
import Colors from "../../../../../shared/theme/colors";
import styles from "./styles";
import CustomTextInput from "../../../../../auth/components/inputs/textinput";
import { useTranslation } from "react-i18next";
import {Picker} from '@react-native-picker/picker';
import Text from "../../../../../shared/components/native/text";
import DocumentPicker from 'react-native-document-picker';
import {WebView} from "react-native-webview";
import Simplebutton from "../../../../../shared/components/buttons/simplebutton";
import { POST } from "../../../../../../api/methods";
import ROUTES from "../../../../../../api/routes";
import { useAppSelector } from "../../../../../../../hooks";
import Toast from "react-native-toast-message";
import AwesomeAlert from "react-native-awesome-alerts";

interface Props {
  onDocumentPick: (uri: string, name: string) => void;
}
export default function AddPiece ({onDocumentPick}:Props){
  const types_requetes = useMemo(()=>{return [
    'fiche_preinscription',
    'acte_naissance'
  ]},[]);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const token = useAppSelector(state=>state.auth.userToken);
  const [loading, setLoading] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [previewUri, setPreviewUri] = useState('');
  const [name,setName] = useState<string>('');
  const [type,setType] = useState<string>(types_requetes[0]);
  const [documentName, setDocumentName] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const pickDocument = async () => {
    try {

      setLoading(true);
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result)
      // @ts-ignore
      setDocumentName(result[0].name);
      // @ts-ignore
      setDocumentType(result[0].type);
      setPreviewUri(result[0].uri);
      console.log(result[0].type);
    } catch (err) {
      console.warn('Error picking document:', err);
    } finally {
      setLoading(false);
    }
  };
  const addDocument = ()=>{
    console.log(token)
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('type',type);
      data.append('name',name);
      data.append('file',{
        uri: previewUri,
        type: documentType,
        name: documentName
      })
      let apiRoute = ROUTES.V1.USER.PIECE.ADD;
      POST(apiRoute,data,token)
        .then(res=>res.json())
        .then(responseData=>{
          console.warn(responseData);
          navigation.goBack();
          Toast.show({
            type: 'success',
            position: 'top',
            text2: 'Document ajouté avec succès !',
          })
        })
        .catch(err=>{
          console.warn(err)
          setIsLoading(false);
          Toast.show({
            type: 'error',
            position: 'top',
            text2: 'Une erreur est survenue !'
          });
        })
        .finally(()=>{
          setIsLoading(false);
        })

    }
    catch (err){
      console.warn(err);
      return;
    }
  }
  useEffect(()=>{
    navigation.setOptions({
      headerTitleStyle:{
        fontFamily:fontFamily.ysabeauMedium,
        fontSize:fontSize.smallTitle
      },
      headerTitleAlign:'center',
      headerLeft:()=>(
        <TouchableOpacity style={{marginLeft:widthPercentageToDP('2%')}} onPress={()=>navigation.goBack()}>
          <Icon name={Icons.back} size={widthPercentageToDP('6%')} color={Colors.primary} />
        </TouchableOpacity>
      )
    })
  },[navigation])
  return (
    <SafeAreaView style={styles.container}>
      <AwesomeAlert
        show={isLoading}
        title={'operation'}
        message={'ajout du document ....'}
        showProgress={true}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
      <View>
        <Text style={styles.intitule}>{t('name')}</Text>
        <CustomTextInput placeholder={t('name')} onChangeText={(newName)=>{setName(newName)}}/>
        <Text style={styles.intitule}>type de requete</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={type} onValueChange={(itemValue, itemIndex)=>{setType(itemValue)}} style={styles.picker} itemStyle={styles.pickerItem} dropdownIconColor={Colors.primary}>
            {
              types_requetes.map((item,index)=><Picker.Item fontFamily={fontFamily.ysabeauText} label={item} value={item} />)
            }
          </Picker>
        </View>
        <Text style={styles.intitule}>Selectionner le document</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Icon name={Icons.MAIN.PIECES.DOCUMENT} size={widthPercentageToDP('5%')} color={Colors.primary} />
          {loading ? (
            <ActivityIndicator size="small" color="#333" />
          ) : (
            <>
              <Text style={styles.uploadText}>
                Importer un document
              </Text>
            </>
          )}
        </TouchableOpacity>
            {previewUri ? (
                <TouchableOpacity onPress={()=>{ // @ts-ignore
                  navigation.navigate('preview_document',{uri:previewUri,type:documentType})}}>
                  {
                    documentType === 'application/pdf' ?
                      (
                        <Text style={styles.uploadText}>{documentName}</Text>
                      )
                      :
                        (
                      <Image
                        source={{ uri: previewUri }}
                        style={styles.documentPreview} />
                        )
                  }

                </TouchableOpacity>
            ) : null}
        <Simplebutton text={'Add document'} func={addDocument} />
      </View>
    </SafeAreaView>
  ) ;
};
