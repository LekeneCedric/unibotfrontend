import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Text from "../../../../../shared/components/native/text";
import styles from "./styles";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../../../../shared/theme/colors";
import { GET } from "../../../../../../api/methods";
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


const RequestDetail: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useAppSelector(state => state.auth.userToken);
  const [requestDetail, setRequestDetail] = useState<IRequestDetail>({});
  const [isLoading, setIsLoading] = useState(false);
  //@ts-ignore
  const { request_id } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: fontFamily.ysabeauMedium,
        fontSize: fontSize.smallTitle
      },
      headerTitle: ()=><Text style={styles.title}><Text style={styles.labelTitle}> Objet : </Text>{requestDetail.types?.name}</Text>,
      headerTitleAlign: "center"
    });
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    GET(`${ROUTES.V1.USER.REQUEST.DETAIL}/${request_id}`, token)
      .then(res => res.json())
      .then(res => {
        setRequestDetail(res);
        console.log(res);
      })
      .catch(err => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <View style={styles.container}>
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
                  <PrincipalDocument name={requestDetail.types?.name!} path={requestDetail!.media} />
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
              <View>
                <Simplebutton text={"Download my request files"} func={()=>{}}/>
              </View>

            </>
          )

      }


    </View>
  );
};
export default RequestDetail;
