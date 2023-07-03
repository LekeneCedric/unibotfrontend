import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Text from "../../../../shared/components/native/text";
import Colors from "../../../../shared/theme/colors";
import { useTranslation } from "react-i18next";
import {CountryPicker} from "react-native-country-codes-picker";
type props = {
  placeholder: string;
  onBlur?: (e:any) => void;
  onChangeText: any;
  status?: string;
  forForm?: boolean;
  value?: string;
  onCodeChange: (text:string) => void;
}
const PhoneInput: React.FC<props> =
  ({
     placeholder,
     value,
     onBlur,
     status,
     forForm,
     onChangeText,
     onCodeChange,
  }) => {

  const {t,i18n} = useTranslation();
  const [code,setCode] = useState<string>("+237");
  const [showCode,setShowCode] = useState<boolean>(false);
  return (
    <View style={
      [
        styles.container,
      {
        borderWidth: forForm && status !== null ? 1 : 0 ,
        borderColor: !status ? Colors.success : Colors.danger
      }
    ]}>
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={()=>{setShowCode(true)}}>
        <Text style={styles.inputElement}>{code}</Text>
      </TouchableOpacity>

      <TextInput style={styles.textInput}
                 onBlur={onBlur}
                 keyboardType={'numeric'}
                 maxLength={17}
                 cursorColor={Colors.primary}
                 underlineColorAndroid="transparent"
                 placeholderTextColor={Colors.primary}
                 value={value}
                 //@ts-ignore
                 placeholder={placeholder}
                 onChangeText={onChangeText}/>
      <CountryPicker
        show = {showCode}
        style={{
          countryName:styles.countryName,
          dialCode:styles.SelectCodeItem
        }}
        pickerButtonOnPress={(item) => {
          onCodeChange(item.dial_code);
          setCode(item.dial_code);
          setShowCode(false);
        }}
       lang={i18n.language}
      />
    </View>
  );
};
export default PhoneInput;
