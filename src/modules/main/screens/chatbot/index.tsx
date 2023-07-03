import { Alert, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { GiftedChat, IMessage, QuickReplies } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import Text from "../../../shared/components/native/text";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { DialogFlowConfig } from "../../../../../env";
import {Dialogflow_V2} from "react-native-dialogflow";
import React, { useEffect, useState } from "react";
import { addMessage, reinitializeMessages, sendBotResponse } from "../../../../redux/reducers/chatbotSlice";
import Colors from "../../../shared/theme/colors";
import { POST } from "../../../../api/methods";
import routes from "../../../../api/routes";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ROUTES from '../../../../api/routes';
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../shared/theme/icon";

export default function Assistant() {
  const navigation = useNavigation();
  const [t,i18n] = useTranslation();
  const [token,setToekn] = useState(useAppSelector(state=>state.auth.userToken));
  const [isLoading,setIsLoading] = useState(false);
  const messages = useAppSelector(state => state.chatbot.messages);
  const dispatch = useAppDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image size={40} source={require('../../../../assets/images/chatbot/chatbot.jpg')} />
            <Text> Unibot </Text>
          </View>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'reinitialisation conversation',
              "Desirez vous reellement reinitialiser votre conversation avec le chatbot ?",
              [
                {
                  text: 'annuler',
                  onPress: () => {},
                },
                {
                  text: 'oui',
                  onPress: () => {dispatch(reinitializeMessages())},
                }
              ]
            )
          }} style={{marginRight: 5}}>
            <Icon name={Icons.MAIN.TABS.ASSISTANT.RESET} size={30} color={Colors.black} />
          </TouchableOpacity>
        )
      }
    })
  },[navigation])
  const handleGoogleResponse = (result:any)=>{
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let message = '';
    let parameters = result.queryResult.parameters;
    const data = new FormData();
    data.append('type_request_id',Number(text.split('|')[0].split('_')[1]))
    data.append('lang',i18n.language);
    Object.keys(parameters).forEach((key) => {
      data.append(key, parameters[key]);
    });
    message = text.split('|')[1];
    dispatch(sendBotResponse(message));

    if (text.includes('finish_'))
    {
      setIsLoading(true);
      POST(ROUTES.V1.USER.REQUEST.ADD,data,token)
        .then(res=>res.json())
        .then(res=>{
          console.log(res);
          //@ts-ignore
          navigation.navigate('requests');
        })
        .catch(err=>{console.log(`err ${err}`)})
        .finally(()=>{
          setIsLoading(false);
        });
    }
    else {
      dispatch(sendBotResponse(text));
    }

  }
  const onSend = (messages: IMessage[])=>{
    dispatch(addMessage(messages));
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result)=> {handleGoogleResponse(result)},
      (error)=> console.log(error)
    )
  }
  return (
    <View style={styles.container}>

      <AwesomeAlert
        show={isLoading}
        title={'operation'}
        message={'traitement de la requete ....'}
        showProgress={true}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}/>
      <GiftedChat
        renderMessageText={(props) => <Text style={{padding:widthPercentageToDP('1%'),color:props.currentMessage!.user._id!==1?Colors.black:Colors.light}}>{props.currentMessage?.text}</Text>}
        quickReplyTextStyle={styles.quickReplyTextStyle}
        // @ts-ignore
        messages={messages}
        user={{_id:1}}
        onSend={(messages)=>{onSend(messages)}}
      />
    </View>
  )
}
