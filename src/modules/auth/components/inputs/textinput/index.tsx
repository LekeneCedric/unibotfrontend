import React from "react";
import { KeyboardTypeOptions, TextInputProps, View } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native";
import Colors from "../../../../shared/theme/colors";

type props = {
  name?: string,
  placeholder: string,
  value?: string,
  onChangeText: any,
  onBlur?: (e:any) => void,
  keyboardType?: KeyboardTypeOptions,
  status?: string;
  forForm?: boolean;
};
const CustomTextInput : React.FC<props> =
  ({
     name,
     value ,
     placeholder,
     onChangeText,
     onBlur,
     keyboardType,
     status,
     forForm,
   })=>{
  return (
    <View style={
      [
        styles.container,
        {
          borderWidth: forForm && status !== null ? 1 : 0 ,
          borderColor: !status ? Colors.success : Colors.danger
        }
        ]}>
      <TextInput
                 style={styles.textInput}
                 value={value}
                 cursorColor={Colors.primary}
                 underlineColorAndroid="transparent"
                 placeholderTextColor={Colors.primary}
                 placeholder={placeholder}
                 onChangeText={onChangeText}
                 onBlur={onBlur}
                 keyboardType={keyboardType}
      />
    </View>
  );
};
export default CustomTextInput;
