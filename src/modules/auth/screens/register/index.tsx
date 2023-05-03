import { Switch, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Text from "../../../shared/components/native/text";
import CustomTextInput from "../../components/inputs/textinput";
import CustomPasswordInput from "../../components/inputs/passwordinput";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import Googlebutton from "../../../shared/components/buttons/googlebutton";
import LangSwitcher from "../../components/langSwitcher";
import PhoneInput from "../../components/inputs/phoneinput";
import { POST } from "../../../../api/methods";
import routes from "../../../../api/routes";
import AwesomeAlert from "react-native-awesome-alerts";
import { setCredential, setUser } from "../../authSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";

export default function Register():JSX.Element{
  let token = useAppSelector(state=>state.auth.userToken);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {t,i18n} = useTranslation();
  const [isLoading,setIsLoading] = useState(false);
  const [showError,setShowError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [currentLang,setCurrentLang] = useState(i18n.language);
  const [userData,setUserData] = useState({});
  const signUp = ()=>{
    POST(routes.AUTH.REGISTER,userData)
      .then(response=>{
        if (!response.ok) {
          if (response.status===500) {
            throw new Error('Internal Server Error');
          }
          else if (response.status===401)
          {
            throw new Error('Verify your fill correctly form and try again !');
          }
          else {
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then(responseData=>{
        dispatch(setCredential(responseData.token));
        dispatch(setUser(responseData.user));
      })
      .catch((err)=>{
        setErrorMessage(err.message)
        setShowError(true);
      })
      .finally(()=>{
        setTimeout(()=>{
          setIsLoading(false);
        },0)
      })
  }
  const handleContact = (value:any)=>{
    setUserData({...userData,phone1:value});
  }
  const switchLang = ()=>{
    setCurrentLang(currentLang==="en"?"fr":"en");
    i18n.changeLanguage(currentLang==="en"?"fr":"en");
  };
  const navTo = (route:string)=>{
    // @ts-ignore
    navigation.navigate(route);
  }
  useEffect(()=>{
    i18n.changeLanguage(currentLang);
  },[]);

  return (
    <View style={styles.container}>
      <LangSwitcher />
      <AwesomeAlert
        show={isLoading}
        title={t('connextion')!}
        message={t('isconnexionmessage')!}
        showProgress={true}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
      <AwesomeAlert
        show={showError}
        title={"error"}
        message={errorMessage}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        onCancelPressed={()=>{
          setShowError(false);
        }}
      />
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>{t('create_account')}</Text>
        <Text style={styles.welcomeDetail}>{t('fill_form')}</Text>
      </View>

      <View style={styles.middle}>
        <CustomTextInput placeholder={t('fullname')} onChangeText={(name)=>{setUserData({...userData,name:name})}}/>
        <PhoneInput changeFinalPhone={handleContact} />
        <CustomTextInput placeholder={'email'} onChangeText={(email)=>{setUserData({...userData,email:email})}}/>
        <CustomPasswordInput placeholder={t('password')} onChangeText={(password)=>{setUserData({...userData,password:password})}}/>
        <CustomPasswordInput placeholder={t('password_confirmation')} onChangeText={(password_confirmation)=>{setUserData({...userData,password_confirmation:password_confirmation})}}/>
      </View>

      <View style={styles.bottom}>
        <View>
          <Simplebutton text={t("register")} func={signUp} />
          <Googlebutton text={t("signup_with_google")} func={() => {
          }} />
        </View>
        <View style={styles.already}>
          <Text>{t('alreadyregister')}</Text>
          <TouchableOpacity onPress={()=>{navTo('login')}}><Text style={styles.signInLink}>{t('connect_proposition')}</Text></TouchableOpacity>
        </View>
      </View>
    </View>);
}
