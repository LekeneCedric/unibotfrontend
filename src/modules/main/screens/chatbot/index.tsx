import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { GiftedChat, IMessage, QuickReplies } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import Text from "../../../shared/components/native/text";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { DialogFlowConfig } from "../../../../../env";
import { useEffect, useState } from "react";
import { addMessage, sendBotResponse } from "../../../../redux/reducers/chatbotSlice";
import Colors from "../../../shared/theme/colors";
import { POST } from "../../../../api/methods";
import routes from "../../../../api/routes";

export default function Assistant() {
  const [token,setToekn] = useState(useAppSelector(state=>state.auth.userToken));
  const messages = useAppSelector(state => state.chatbot.messages);
  const dispatch = useAppDispatch();
  const handleGoogleResponse = (result:any)=>{
    console.log(result.queryResult)
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    console.log(text)
    if (text.includes('finish_r'))
    {
      text = text.split('|')[1];
      let data = result.queryResult.parameters;
      // POST(routes.V1.USER.REQUEST.ADD,data,token)
      //   .then(res=>res.json())
      //   .then(res=>{})
      //   .catch(err=>{})
      //   .finally(()=>{})
      console.log(data);
    }
    dispatch(sendBotResponse(text));
  }
  const onSend = (messages: IMessage[])=>{
    dispatch(addMessage(messages));
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result)=> handleGoogleResponse(result),
      (error)=> console.log(error)
    )
  }

  useEffect(()=>{
    Dialogflow_V2.setConfiguration(
      DialogFlowConfig.client_email,
      DialogFlowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      DialogFlowConfig.project_id
    );
  },[])
  return (
    <View style={styles.container}>
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
