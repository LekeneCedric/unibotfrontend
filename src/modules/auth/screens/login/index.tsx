import React, { useEffect, useState } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Text from "../../../shared/components/native/text";
import CustomTextInput from "../../components/inputs/textinput";
import CustomPasswordInput from "../../components/inputs/passwordinput";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import { useTranslation } from "react-i18next";
import Googlebutton from "../../../shared/components/buttons/googlebutton";
import { useNavigation } from "@react-navigation/native";
import LangSwitcher from "../../components/langSwitcher";
import { POST } from "../../../../api/methods";
import routes from "../../../../api/routes";
import AwesomeAlert from "react-native-awesome-alerts";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setCredential, setUser } from "../../authSlice";

interface Iuser {
  email?:string,
  password?:string
}
export default function Login(): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [userData,setUserData] = useState<Iuser>({});
  const [isLoading,setIsLoading] = useState(false)
  const [showError,setShowError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const {t,i18n} = useTranslation();
  const [currentLang,setCurrentLang] = useState(i18n.language);
  const navTo = (route:string)=>{
    // @ts-ignore
    navigation.navigate(route);
  };
  const signIn = ()=>{
    const data = new FormData();
    data.append('email',userData.email);
    data.append('password',userData.password);
    setIsLoading(true);
    POST(routes.V1.AUTH.LOGIN,data)
      .then(response=>{
        {
          if (!response.ok) {
            if (response.status===500) {
              throw new Error('Internal Server Error');
            }
            else if (response.status===401)
            {
              throw new Error('Verify email and password and try again !');
            }
            else {
              throw new Error('Network response was not ok');
            }
          }
          return response.json();
        }
      })
      .then((responseData)=>{
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
        }
      )
  }
  useEffect(()=>{
    i18n.changeLanguage(currentLang);
  },[]);
  // @ts-ignore
  // @ts-ignore
  return (
    <View style={styles.container}>
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
      <LangSwitcher/>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>{t('welcome_back')}</Text>
        <Text style={styles.welcomeDetail}>{t('signin_proposition')}</Text>
      </View>

      <View style={styles.middle}>
        <CustomTextInput placeholder={'email'} onChangeText={(email)=>{setUserData({...userData,email:email})}} />
        <CustomPasswordInput placeholder={t('password')} onChangeText={(password)=>{setUserData({...userData,password:password})}}/>
        <TouchableOpacity style={styles.forgetPassButton}>
          <Text style={styles.forgetPassText}>Forget password ?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <View>
          <Simplebutton text={t("connextion ")} func={signIn} />
          <Googlebutton text={t("sign_with_google")} func={() => {
          }} />
        </View>
        <View style={styles.already}>
          <Text>{t("notregister")}</Text>
          <TouchableOpacity onPress={() => {
            navTo('register')
          }}><Text style={styles.signInLink}>{t("register")}</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
