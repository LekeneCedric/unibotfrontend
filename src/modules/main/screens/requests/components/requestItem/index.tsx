import React, { useEffect, useState } from "react";
import IRequest from "../../../../../../models/request/request.model";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../../../../../shared/theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../../../shared/theme/icon";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Text from "../../../../../shared/components/native/text";
import { DELETE, storageBackend } from "../../../../../../api/methods";
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import routes from "../../../../../../api/routes";
import { removeRequest } from "../../../../../../redux/reducers/requestSlice";
import formatDate from "../../../../../shared/utils/formatDate";

interface props extends IRequest{}
const RequestItem : React.FC<props> = ({id, types, created_at})=>{
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [token,setToken] = useState(useAppSelector(state=>state.auth.userToken));
  const [showAlert,setShowAlert] = useState(false);
  const DeleteRequest = ()=>{
    DELETE(`${routes.V1.USER.REQUEST.DELETE}`,id!,token)
      .then(res=>{
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
        dispatch(removeRequest(id!))
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        setShowAlert(false);
      })
  }
  return (
    <View>
      <View style={styles.container}>
        <AwesomeAlert
          show={showAlert}
          title={'delete'}
          message={`would you delete this request ?`}
          showProgress={true}
          showCancelButton={true}
          showConfirmButton={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          onCancelPressed={()=>{setShowAlert(false)}}
          onConfirmPressed={DeleteRequest}
          confirmButtonColor={Colors.danger}
        />
        <Icon style={styles.icon1} name={Icons.MAIN.REQUESTS.REQUEST} size={widthPercentageToDP('7%')} color={Colors.primary}/>
        <View style={styles.content}>
          <Text style={[styles.title]}>{types.name}</Text>
          <Text style={styles.typePiece}>{formatDate(created_at)}</Text>
        </View>
        <View style={styles.iconRightContainer}>
          <TouchableOpacity onPress={()=>{
            //@ts-ignore
            navigation.navigate('detail_request',{request_id:id})
          }}>
            <Icon name={Icons.MAIN.REQUESTS.DOWNLOAD} size={widthPercentageToDP('6%')} color={Colors.primary}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight:widthPercentageToDP('2%')}}
            onPress={()=>{setShowAlert(true)}}
          >
            <Icon name={Icons.MAIN.PIECES.DELETE} size={widthPercentageToDP('6%')} color={Colors.danger}/>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
};
export default RequestItem;
