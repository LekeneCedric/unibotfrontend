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

  const donwloaRequest = async ()=>{
    setIsDownload(true)
    GET(`${routes.V1.USER.REQUEST.DOWNLOAD}/${request_id}`,token)
      .then(res=>res.json())
      .then(res => {
        let files = res.files;
        downloadFiles(files,requestDetail.types?.name!);
      })
      .catch(err=>{console.log(err)})
      .finally(()=>{
        setDownloadFinish(true)
        setIsDownload(false);
        setTimeout(()=>{
          setDownloadFinish(false)
        },2000)
      })
    // const { dirs } = RNFetchBlob.fs;
    // const downloadDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    // const fileExtension = '.zip';
    // const fileName = `request_${Date.now()}${fileExtension}`;
    //   RNFetchBlob.config({
    //     headers: {
    //       Accept: "application/json",
    //       'Authorization': `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     fileCache: true,
    //     addAndroidDownloads: {
    //       useDownloadManager: true,
    //       notification: true,
    //       title: fileName,
    //       path: `${downloadDir}/${fileName}`,
    //     }
    //   })
    //   .fetch('GET',`${urlBackend}${routes.V1.USER.REQUEST.DOWNLOAD}/${request_id}`)
    //   .then((res:any)=>{
    //     console.warn('File downloaded', res.path());
    //   })
    //   .catch((err:any)=>{
    //     console.warn('error download file : ',err)
    //   })
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
          headerTitle: ()=><Text style={styles.title}><Text style={styles.labelTitle}> Objet : </Text>{res.types?.name!}</Text>,
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
        message={'Le telechargement de votre requete est termine'}
        showProgress={false}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
      {
        isLoading ? (
            <View>
              <ActivityIndicator size={widthPercentageToDP("10%")} color={Colors.primary} />
              <Text style={styles.textLoader}>loading request & pieces</Text>
            </View>
          )
          :
          (
            <>
              <View>
                <Text style={styles.description}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loremen an unknown printer took a galley of type and scrambled it to make a type specimen book
                </Text>
              </View>
              <View>
                <View style={styles.section}>
                  <Text style={[styles.labelTitle, { marginTop: heightPercentageToDP("2%") }]}>Requete principale</Text>
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
                  <Text style={[styles.labelTitle, { marginTop: heightPercentageToDP("2%") }]}>Pieces jointes</Text>
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
                            <Simplebutton text={"Download my request files"} func={donwloaRequest}/>
                          </View>
                      )
                        : (
                        <View>
                          <ActivityIndicator size={widthPercentageToDP("10%")} color={Colors.primary} />
                          <Text style={styles.textLoader}>Telechargement de la requete</Text>
                        </View>
                      )
                ):
                  (
                    <View>
                      <Text style={styles.textwarning}>
                        sorry but you cannot download your request until the attachments are complete, please fill in your documents and try again
                      </Text>
                      <View>
                        <Simplebutton text={"Refresh"} func={()=>{setRefreshKey((prev)=>prev+1)}}/>
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
