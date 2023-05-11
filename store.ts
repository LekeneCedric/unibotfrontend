import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./src/redux/reducers/authSlice";
import { pieceSlice } from "./src/redux/reducers/pieceSlice";
import { requestSlice } from "./src/redux/reducers/requestSlice";
import { chatbotSlice } from "./src/redux/reducers/chatbotSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pieces: pieceSlice.reducer,
    request: requestSlice.reducer,
    chatbot: chatbotSlice.reducer
  }
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
