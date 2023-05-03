import React, { useEffect, useMemo, useState } from "react";
import { Image, SafeAreaView, Switch, TouchableOpacity, View } from "react-native";
import styles from './styles';
import { useTranslation } from "react-i18next";
import Text from "../../../shared/components/native/text";
import Colors from "../../../shared/theme/colors";
import { useNavigation } from "@react-navigation/native";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import LangSwitcher from "../../components/langSwitcher";

export default function Welcome():JSX.Element {
  useEffect(()=>{
    i18n.changeLanguage(currentLang);
  },[]);
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  const [currentLang,setCurrentLang] = useState(i18n.language);
  const switchLang = ()=>{
    setCurrentLang(currentLang==="en"?"fr":"en");
    i18n.changeLanguage(currentLang==="en"?"fr":"en");
  };
  const navTo = (route:string)=>{
    // @ts-ignore
    navigation.navigate(route)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.botImage} source={require('../../../../assets/images/welcome/welcomebot.png')} />
      </View>
      <LangSwitcher/>
      <View style={styles.container2}>
        <Text style={styles.title}>Unibot</Text>
        <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
        <Simplebutton text={t('getStarted')} func={()=>{navTo('register')}} />
        <View style={styles.already}>
          <Text>{t('alreadyregister')}</Text>
          <TouchableOpacity onPress={()=>{navTo('login')}}><Text style={styles.signInLink}>{t('connect_proposition')}</Text></TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};
