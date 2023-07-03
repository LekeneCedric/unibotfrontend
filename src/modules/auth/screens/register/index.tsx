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
import { setCredential, setUser } from "../../../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import ROUTES from "../../../../api/routes";
import IUser from "../../../../models/user.model";
import * as yup from 'yup';
import { Formik } from "formik";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function Register():JSX.Element{
  let token = useAppSelector(state=>state.auth.userToken);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {t,i18n} = useTranslation();
  const [isLoading,setIsLoading] = useState(false);
  const [showError,setShowError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [currentLang,setCurrentLang] = useState(i18n.language);
  const [code, setCode] = useState("+237");
  const signUp = (form : any)=>{
    // console.warn(form);
    setIsLoading(true)
    const data = new FormData();
    data.append('name',form.name);
    data.append('password',form.password);
    data.append('password_confirmation',form.passwordConfirmation);
    data.append('email',form.email);
    data.append('phone1',`${code}${form.phone1}`);
    POST(ROUTES.V1.AUTH.REGISTER,data)
      .then(response=>{
        if (!response.ok) {
          if (response.status===500) {
            throw new Error('Internal Server Error');
          }
          else if (response.status===401)
          {
            console.log(response);
            throw new Error('Verify your fill correctly form and try again !');
          }
          else {
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then(responseData=>{
        let data = {
          TYPE : "SET_CREDENTIAL",
          value : responseData.token
        }
        dispatch(setCredential(data));
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
  const RegisterValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(8, ({min}) => `${t('auth.login.validation.name.invalid1')} ${min} ${t('auth.login.validation.name.invalid2')}`)
      .required(`${t('auth.login.validation.name.required')}`),
    phone1: yup
      .string()
      .matches(/^\d{9,}$/,`${t('auth.login.validation.phone1.invalid')}`)
      .required(`${t('auth.login.validation.phone1.required')}`),
    email: yup
      .string()
      .email(`${t('auth.login.validation.email.invalid')}`)
      .required(`${t('auth.login.validation.email.required')}`),
    password: yup
      .string()
      .min(8, ({min}) => `${t('auth.login.validation.password.invalid1')} ${min} ${t('auth.login.validation.password.invalid2')}`)
      .required(`${t('auth.login.validation.password.required')}`),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], `${t('auth.login.validation.password_confirmation.invalid')}`)
      .required(`${t('auth.login.validation.password_confirmation.required')}`),
  })
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
        title={'inscription'}
        message={t('verification des informations')!}
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
        <Formik
          validationSchema={RegisterValidationSchema}
          initialValues={{name: '',phone1: '', email: '', password: '', passwordConfirmation: ''}}
          onSubmit={(values) => {signUp(values)}}>
          {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
            <>
              <CustomTextInput
                placeholder={t('fullname')}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                status={errors.name}
                forForm={true} />
              {errors.name &&
                <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.name}</Text>
              }
              <PhoneInput
                onCodeChange={(code)=>{setCode(code)}}
                placeholder={t('phonenumber')}
                onChangeText={handleChange('phone1')}
                onBlur={handleBlur('phone1')}
                value={values.phone1}
                status = {errors.phone1}
                forForm={true}/>
              {errors.phone1 &&
                <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.phone1}</Text>
              }
              <CustomTextInput
                placeholder={'email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType={'email-address'}
                status = {errors.email}
                forForm={true}/>
              {errors.email &&
                <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.email}</Text>
              }
              <CustomPasswordInput
                placeholder={t('password')}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                status={errors.password}
                forForm={true} />
              {errors.password &&
                <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.password}</Text>
              }
              <CustomPasswordInput
                placeholder={t('password_confirmation')}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.passwordConfirmation}
                status={errors.passwordConfirmation}
                forForm={true} />
              {errors.passwordConfirmation &&
                    <Text style={{ marginLeft: widthPercentageToDP('3%'), color: 'red' }}>{errors.passwordConfirmation}</Text>
                  }
              <View style={styles.bottom}>
                <View>
                  <Simplebutton disabled={!isValid} text={t("register")} func={handleSubmit} />
                  {/*<Googlebutton text={t("signup_with_google")} func={() => {}} />*/}
                </View>
                <View style={styles.already}>
                  <Text>{t('alreadyregister')}</Text>
                  <TouchableOpacity onPress={()=>{navTo('login')}}><Text style={styles.signInLink}>{t('connect_proposition')}</Text></TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
        </View>


    </View>);
}
