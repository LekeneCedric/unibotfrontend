import { useAppDispatch } from "../../../hooks";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCredential } from "../../redux/reducers/authSlice";

export default function AuthChecker()
{
  const dispatch = useAppDispatch();
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
      // const isAuthenticated = token!==null;
      // dispatch(setAuthenticated(isAuthenticated));
    }
    checkToken();
  },[]);
  return null;
};
