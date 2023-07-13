import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Platform, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Text from "../../../../../shared/components/native/text";
import styles from "./styles";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../../../../shared/theme/colors";
import { GET, urlBackend } from "../../../../../../api/methods";
import ROUTES from "../../../../../../api/routes";
import { useAppSelector } from "../../../../../../../hooks";
import IRequestDetail from "../../../../../../models/request/request.detail.model";
import fontFamily from "../../../../../shared/theme/fontFamily";
import fontSize from "../../../../../shared/theme/fontSize";
import ToDownloadDocument from "../toDownloadDocument";
import PrincipalDocument from "../principalDocument";
import Simplebutton from "../../../../../shared/components/buttons/simplebutton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
//@ts-ignore
import RNFetchBlob from 'react-native-fetch-blob'
import routes from "../../../../../../api/routes";
import downloadFiles from "../../../../../shared/utils/downloadFile";
import AwesomeAlert from "react-native-awesome-alerts";
import downloadFile from "../../../../../shared/utils/downloadFile";
import { useTranslation } from "react-i18next";

const RequestDetail: React.FC<{}> = ({}) => {
  const { fs } = RNFetchBlob;
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshKey,setRefreshKey] = useState(0)
  const token = useAppSelector(state => state.auth.userToken);
  const [requestDetail, setRequestDetail] = useState<IRequestDetail>({});
  const [allFilesIsPresent,setAllFilesIsPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownload,setIsDownload] = useState(false);
  const [downloadFinish,setDownloadFinish] = useState(false);
  //@ts-ignore
  const { request_id } = route.params;
  const {t, i18n} = useTranslation();
  const currentLang = i18n.language;
  const donwloaRequest = async ()=>{
    setIsDownload(true)
    downloadFile(request_id,token).then(() => {})
      .finally(()=>{
        setDownloadFinish(true)
        setIsDownload(false);
        setTimeout(()=>{
          setDownloadFinish(false)
        },2000)
      })
  }
  useFocusEffect(
    useCallback(()=>{
      console.log('refresh')
    },[])
  )
  useEffect(() => {
    setIsLoading(true);
    GET(`${ROUTES.V1.USER.REQUEST.DETAIL}/${request_id}`, token)
      .then(res => res.json())
      .then(res => {
        console.warn(res)
        // console.warn(res.filePath)
        setRequestDetail(res);
        navigation.setOptions({
          headerTitleStyle: {
            fontFamily: fontFamily.ysabeauMedium,
            fontSize: fontSize.smallTitle
          },
          headerTitle: ()=><Text style={styles.title}><Text style={styles.labelTitle}> {currentLang === 'en' ? 'Object' : 'Objet'} </Text>{res.types?.name!}</Text>,
          headerTitleAlign: "center"
        });
        console.log(res);
      })
      .catch(err => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshKey]);


  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={downloadFinish}
        title={'Operation'}
        message={currentLang === 'en' ? 'The download of your request is complete' : 'Le telechargement de votre requete est termine'}
        showProgress={false}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
      {
        isLoading ? (
            <View>
              <ActivityIndicator size={widthPercentageToDP("10%")} color={Colors.primary} />
              <Text style={styles.textLoader}>{currentLang === 'en' ? 'Loading request & Pieces' : 'Chargement de la requete et des pieces jointes'}</Text>
            </View>
          )
          :
          (
            <>
              <View>
                <Text style={styles.description}>
                  {currentLang === 'en' ? 'Consult the details of your request, the progress of the latter, the attachments; if the required documents are not presented, import them then download the latter.' : 'Consulter les details de votre requete, l\'etat d\'avancement de cette derniere , les pieces jointes ; si les pieces requises ne sont pas presentes , importer les puis telechargez cette derniere.'}
                  {currentLang === 'en' ? 'Your request and attachments will be uploaded to the folder' : 'Votre requete et les pieces jointes seront telechargees dans le dossier'}
                   <Text style={{fontFamily: fontFamily.ysabeauBold}}>{currentLang === 'en' ? 'Download' : 'Telecharger'}</Text> {currentLang === 'en' ? 'from your phone as a zip file' : 'de votre telephone sous la forme d\'un fichier zip'}  <Text style={{fontFamily: fontFamily.ysabeauBold}}>{currentLang === 'en' ? 'request_name' : 'nom_requete'}.zip</Text>
                </Text>
              </View>
              <View>
                <View style={styles.section}>
                  <Text style={[styles.labelTitle, { marginTop: heightPercentageToDP("2%") }]}>{currentLang === 'en' ? 'Principal request' : 'Requete principale'}</Text>
                  <TouchableOpacity>
                    <Icon name={Icons.MAIN.REQUESTS.information} size={widthPercentageToDP('4%')} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <View>
                  <PrincipalDocument name={requestDetail.types?.name!} path={requestDetail.filePath!} />
                </View>
              </View>
              <View>
                <View style={styles.section}>
                  <Text style={[styles.labelTitle, { marginTop: heightPercentageToDP("2%") }]}>{currentLang === 'en' ? 'Attachments' : 'Pieces jointes'}</Text>
                  <TouchableOpacity>
                    <Icon name={Icons.MAIN.REQUESTS.information} size={widthPercentageToDP('4%')} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                {
                  requestDetail.requires?.map((require, index) =>
                    <ToDownloadDocument type_piece_id={require.type_piece_id} name={require.name} body={require.body} />)
                }
              </View>
              {
                requestDetail.is_ok ? (
                      !isDownload ? (
                          <View>
                            <Simplebutton text={currentLang === 'en' ? 'Download my request' : 'Telecharger ma requete'} func={donwloaRequest}/>
                          </View>
                      )
                        : (
                        <View>
                          <ActivityIndicator size={widthPercentageToDP("10%")} color={Colors.primary} />
                          <Text style={styles.textLoader}>{currentLang === 'en' ? 'Download of the request' : 'Telechargement de la requete'}</Text>
                        </View>
                      )
                ):
                  (
                    <View>
                      <Text style={styles.textwarning}>
                        {currentLang === 'en' ? 'sorry but you cannot download your request until the attachments are complete, please fill in your documents and try again' : 'désolé mais vous ne pouvez pas télécharger votre demande tant que les pièces jointes ne sont pas complètes, veuillez remplir vos documents et réessayer'}

                      </Text>
                      <View>
                        <Simplebutton text={currentLang === 'en' ? 'Refresh' : 'Rechargement'} func={()=>{setRefreshKey((prev)=>prev+1)}}/>
                      </View>
                    </View>

                  )
              }


            </>
          )

      }


    </View>
  );
};
export default RequestDetail;
