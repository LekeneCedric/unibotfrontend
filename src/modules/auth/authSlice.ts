import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, remove, save } from "../shared/utils/localstorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface authState {
  isAuthenticated: boolean,
  userInfo: any, // for user object
  userToken: any, // for storing the JWT
}
const initialState: authState = {
  isAuthenticated: AsyncStorage.getItem('token')!==null,
  userInfo: null, // for user object
  userToken: AsyncStorage.getItem('token'), // for storing the JWT
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setCredential: (state, action: PayloadAction<string>) => {
          AsyncStorage.setItem('token', action.payload);
          state.userToken = action.payload;
          state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<any>) => {
          state.userInfo = action.payload;
          state.isAuthenticated = true;
    },
    logout: state => {
     AsyncStorage.removeItem('token');
      state.userToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;
    }
  }
});
export const {setAuth, setCredential,setUser,logout} = authSlice.actions;
export default authSlice.reducer;
