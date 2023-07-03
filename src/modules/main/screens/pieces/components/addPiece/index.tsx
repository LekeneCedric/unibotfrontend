import { ActivityIndicator, Image, Linking, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import fontFamily from "../../../../../shared/theme/fontFamily";
import fontSize from "../../../../../shared/theme/fontSize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
import Colors from "../../../../../shared/theme/colors";
import styles from "./styles";
import CustomTextInput from "../../../../../auth/components/inputs/textinput";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import Text from "../../../../../shared/components/native/text";
import DocumentPicker from "react-native-document-picker";
import Simplebutton from "../../../../../shared/components/buttons/simplebutton";
import { GET, POST } from "../../../../../../api/methods";
import ROUTES from "../../../../../../api/routes";
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks";
import Toast from "react-native-toast-message";
import AwesomeAlert from "react-native-awesome-alerts";
import { addPiece } from "../../../../../../redux/reducers/pieceSlice";
import ITypePiece from "../../../../../../models/typePiece.model";

interface Props {
  onDocumentPick: (uri: string, name: string) => void;
}
export default function AddPiece ({onDocumentPick}:Props){
  const route = useRoute();
  //@ts-ignore
  const piece_id = route.params!=undefined?route.params.piece_id:null;
  const dispatch = useAppDispatch();
  const types_requetes = useMemo(()=>{return [
    'fiche_preinscription',
    'acte_naissance'
  ]},[]);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const token = useAppSelector(state=>state.auth.userToken);
  const [typesPieces,setTypesPieces] = useState<ITypePiece[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [loadType,setLoadType] = useState(false);
  const [previewUri, setPreviewUri] = useState('');
  const [name,setName] = useState<string>('');
  const [selectedType,setSelectedType] = useState<number>(0);
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
      data.append('name',"piece");
      data.append('type_piece_id',selectedType);
      data.append('file',{
        uri: previewUri,
        type: documentType,
        name: documentName
      })
      let apiRoute = ROUTES.V1.USER.PIECE.ADD;
      POST(apiRoute,data,token)
        .then(res=>res.json())
        .then(responseData=>{
          console.log('piece to add ')
          console.log(responseData);
          dispatch(addPiece(responseData));
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
            text2: 'Une erreur est survenue reessayez !'
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
      //@ts-ignore
      headerTitle:route.params!=undefined?`Add ${route.params.name}`:'add new piece',
      headerTitleAlign:'center',
      headerLeft:()=>(
        <TouchableOpacity style={{marginLeft:widthPercentageToDP('2%')}} onPress={()=>navigation.goBack()}>
          <Icon name={Icons.back} size={widthPercentageToDP('6%')} color={Colors.primary} />
        </TouchableOpacity>
      )
    })
  },[navigation])
  useEffect(()=>{
    setLoadType(true);
    GET(ROUTES.V1.USER.TYPE_PIECE.GET,token)
      .then(res=>{
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(res=>{
        setTypesPieces(res);
        if (piece_id!=null)
        {//si l'id de la piece est passé en parametre
          console.warn(piece_id);
          setSelectedType(piece_id);
        }
        else
        {
          setSelectedType(res[0].id);
        }
      })
      .catch(err=>{
        console.log(`error : ${err}`)
      })
      .finally(()=>{setLoadType(false)})
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <AwesomeAlert
        show={isLoading}
        title={'operation'}
        message={'ajout du document ....'}
        showProgress={true}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}/>
      <View>
        <Text style={styles.intitule}>type de requete</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedType}
                  onValueChange={(itemValue, itemIndex)=>{setSelectedType(itemValue)}}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor={Colors.primary}>
            {
              loadType && <ActivityIndicator size="small" color={Colors.primary}/>
            }
            {
              typesPieces.map((item,index)=>
              {
                if (piece_id!=null)
                {
                  if (item.id === piece_id)
                  {
                    return <Picker.Item style={{fontFamily: fontFamily.ysabeauText}} label={item.name} value={item.id} />
                  }
                }
                else
                {
                  return <Picker.Item style={{fontFamily: fontFamily.ysabeauText}} label={item.name} value={item.id} />
                }
              }
                )
            }
          </Picker>
        </View>
        <Text style={styles.intitule}>Selectionner le document</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Icon name={Icons.MAIN.PIECES.DOCUMENT} size={widthPercentageToDP('5%')} color={Colors.primary} />
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
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
                  if (documentType === 'application/pdf') {
                    Linking.openURL(previewUri);
                  }
                  else {
                    //@ts-ignore
                    navigation.navigate('preview_document',{uri:previewUri,type:documentType})
                  }
                  }}>
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
