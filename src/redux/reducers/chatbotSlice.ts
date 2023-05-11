import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMessage } from "react-native-gifted-chat";

const botAvatar = require("../../assets/images/chatbot/chatbot.jpg");
interface chatbotState  {
  messages : IMessage[],
  id: number,
  name: string,
}

const BOT = {
  _id: 2,
  name: 'UniBot',
  avatar: botAvatar
}
const initialState : chatbotState = {
  messages : [
    {_id: 2, text: 'I am chatbot , you can ask me every questions about university and i can help you to your administrative requests', createdAt: new Date(), user:BOT},
    {_id: 1, text: 'Hello my friend', createdAt: new Date(), user:BOT},
  ],
  id: 1,
  name: ''
};
export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = [...action.payload,...state.messages];
    },
    sendBotResponse: (state, action: PayloadAction<string>) => {
      let msg = {
        _id:state.messages.length+1,
        text:action.payload,
        createdAt:new Date(),
        user:BOT
      }
      state.messages = [msg ,...state.messages];
    },
  }
});
export const { sendBotResponse,addMessage} = chatbotSlice.actions;
export default chatbotSlice.reducer;
