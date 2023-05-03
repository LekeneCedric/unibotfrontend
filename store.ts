import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./src/modules/auth/authSlice";
import { pieceSlice } from "./src/modules/main/screens/pieces/pieceSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pieces: pieceSlice.reducer
  }
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
