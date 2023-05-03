import React, { useEffect, useState } from "react";
import styles from "./styles";
import Text from "../../../shared/components/native/text";
import { Switch, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const LangSwitcher:React.FC<{}> = ({})=>{
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
  return (
    <View style={styles.languageContainer}>
      <Text style={styles.textLang}>{"Francais"}</Text>
      <Switch value={currentLang==="en"} onValueChange={switchLang} />
      <Text style={styles.textLang}>{"English"}</Text>
    </View>
  )
};
export default LangSwitcher;
