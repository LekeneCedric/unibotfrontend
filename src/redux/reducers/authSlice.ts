import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface playload {
  TYPE : string,
  value : any
}
interface authState {
  isAuthenticated: boolean,
  userInfo: any, // for user object
  userToken: any, // for storing the JWT
}
const initialState: authState = {
  isAuthenticated:false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setCredential: (state, action: PayloadAction<playload>) => {
      if (action.payload.TYPE === 'SET_AUTHENTICATED') {
        state.isAuthenticated = true;
        state.userToken = action.payload.value;
      }
      else if (action.payload.TYPE === 'SET_CREDENTIAL') {
        AsyncStorage.setItem('@token', action.payload.value).then(r => console.log(r));
        state.userToken = action.payload.value;
      }
    },
    setUser: (state, action: PayloadAction<any>) => {
          state.userInfo = action.payload;
          state.isAuthenticated = true;
    },
    logout: state => {
     AsyncStorage.removeItem('@token').then(r => console.log(r));
      state.userToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;
    }
  }
});
export const {setAuth, setCredential,setUser,logout} = authSlice.actions;
export default authSlice.reducer;
