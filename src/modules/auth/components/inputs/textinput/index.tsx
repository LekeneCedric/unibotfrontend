import React from "react";
import { TextInputProps, View } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native";
import Colors from "../../../../shared/theme/colors";

type props = {
  placeholder:string,
  onChangeText: ((text: string) => void) | undefined,
};
const CustomTextInput : React.FC<props> = ({placeholder,onChangeText})=>{
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
                 cursorColor={Colors.primary}
                 underlineColorAndroid="transparent"
                 placeholderTextColor={Colors.primary}
                 placeholder={placeholder} onChangeText={onChangeText}/>
    </View>
  );
};
export default CustomTextInput;
