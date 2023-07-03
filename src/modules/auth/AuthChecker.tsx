import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCredential } from "../../redux/reducers/authSlice";
import { loadMesssages } from "../../redux/reducers/chatbotSlice";

export default function AuthChecker()
{
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.chatbot.messages);
  useEffect(()=>{
    const checkToken = async ()=>{
      const token = await AsyncStorage.getItem('@token');
      if (token !== null)
      {
        let data = {
          TYPE : "SET_AUTHENTICATED",
          value : token
        }
        dispatch(setCredential(data))
      }
    }
    const getMessages = async() => {
      const messagesTemp = await AsyncStorage.getItem('@messages');
      const messages = JSON.parse(messagesTemp!);
      if(messages!== null && messages !== undefined && messages.length > 0)
      {
        dispatch(loadMesssages(messages))
      }
    }
    checkToken();
    getMessages();
  },[]);
  useEffect(() => {
    const _storeMessages = async () => {
      try {
        await AsyncStorage.setItem(
          '@messages',
          JSON.stringify(messages),
        );
      } catch (error) {
        // Error saving data
      }
    };
    _storeMessages().then(() => {})
  },[messages])
  return null;
};
