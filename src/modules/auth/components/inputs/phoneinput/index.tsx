import React, { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Text from "../../../../shared/components/native/text";
import Colors from "../../../../shared/theme/colors";
import { useTranslation } from "react-i18next";
import {CountryPicker} from "react-native-country-codes-picker";
type props = {
  changeFinalPhone:any;
}
const PhoneInput: React.FC<props> = ({changeFinalPhone}) => {

  const {t,i18n} = useTranslation();
  const [phone,setPhone] = useState<string>();
  const [code,setCode] = useState<string>("+237");
  const [showCode,setShowCode] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={()=>{setShowCode(true)}}
      >
        <Text style={styles.inputElement}>{code}</Text>
      </TouchableOpacity>

      <TextInput style={styles.textInput}
                 keyboardType={'numeric'}
                 maxLength={10}
                 cursorColor={Colors.primary}
                 underlineColorAndroid="transparent"
                 placeholderTextColor={Colors.primary}
                 value={phone}
                 //@ts-ignore
                 placeholder={t('phonenumber')}
                 onChangeText={(phone)=>{
                   setPhone(`${phone}`);
                   changeFinalPhone(`${code}${phone}`);
                 }}/>
      <CountryPicker
        show = {showCode}
        style={{
          countryName:styles.countryName,
          dialCode:styles.SelectCodeItem
        }}
        pickerButtonOnPress={(item) => {
          setCode(item.dial_code);
          setShowCode(false);
        }}
       lang={i18n.language}
      />
    </SafeAreaView>
  );
};
export default PhoneInput;
