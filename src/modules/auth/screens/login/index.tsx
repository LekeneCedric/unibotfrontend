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
import { setCredential, setUser } from "../../../../redux/reducers/authSlice";
import * as yup from 'yup';
import { Formik } from "formik";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function Login(): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isLoading,setIsLoading] = useState(false)
  const [showError,setShowError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const {t,i18n} = useTranslation();
  const [currentLang,setCurrentLang] = useState(i18n.language);
  const navTo = (route:string)=>{
    // @ts-ignore
    navigation.navigate(route);
  };
  const signIn = (form: {email:string, password:string})=>{
    const data = new FormData();
    data.append('email',form.email);
    data.append('password',form.password);
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
        let data = {
          TYPE : "SET_CREDENTIAL",
          value : responseData.token
        }
        dispatch(setCredential(data));
        dispatch(setUser(responseData.user));
      })
      .catch((err)=>{
        console.log(err)
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
  const LoginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(`${t('auth.login.validation.email.invalid')}`)
      .required(`${t('auth.login.validation.email.required')}`),
    password: yup
      .string()
      .min(8, ({min}) => `${t('auth.login.validation.password.invalid1')} ${min} ${t('auth.login.validation.password.invalid2')}`)
      .required(`${t('auth.login.validation.password.required')}`)
  })
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
        <Formik
          validationSchema={LoginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => {signIn(values)}}
          >
          {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid, }) => (
                <>
                  <CustomTextInput
                    placeholder={'email'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType={'email-address'}
                    status = {errors.email}
                    forForm={true}
                  />
                  {errors.email &&
                    <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.email}</Text>
                  }
                  <CustomPasswordInput
                    placeholder={t('password')}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    status={errors.password}
                    forForm={true}
                  />
                  {errors.password &&
                    <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.password}</Text>
                  }
                  <TouchableOpacity style={styles.forgetPassButton}>
                    <Text style={styles.forgetPassText}>Forget password ?</Text>
                  </TouchableOpacity>
                  <View style={styles.bottom}>
                    <View>
                      <Simplebutton disabled={!isValid}  text={t("connextion ")} func={handleSubmit} />
                      {/*<Googlebutton text={t("sign_with_google")} func={() => {}} />*/}
                    </View>
                    <View style={styles.already}>
                      <Text>{t("notregister")}</Text>
                      <TouchableOpacity onPress={() => {
                        navTo('register')
                      }}><Text style={styles.signInLink}>{t("register")}</Text></TouchableOpacity>
                    </View>
                  </View>
                </>
          )}
        </Formik>
      </View>


    </View>
  );
}
