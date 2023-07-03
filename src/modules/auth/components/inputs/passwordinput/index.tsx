import React, { useState } from "react";
import { KeyboardTypeOptions, TextInputProps, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native";
import Colors from "../../../../shared/theme/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icons from "../../../../shared/theme/icon";

type props = {
  value?: string,
  placeholder:string,
  onChangeText: any,
  onBlur?: (e:any) => void,
  keyboardType?: KeyboardTypeOptions,
  status?: string;
  forForm?: boolean;
}
const CustomPasswordInput:React.FC<props> =
  ({
     value,
     placeholder,
     onChangeText,
     onBlur,
     keyboardType,
     status,
     forForm,
  })=>{
  const [see,setSee] = useState(false);
  const switchSee = ()=>{
    setSee(!see);
  }
  return (
    <View style={[styles.container,{borderWidth: forForm && status !== null ? 1 : 0 , borderColor: !status ? Colors.success : Colors.danger}]}>
      <TextInput style={styles.textInput}
                 value={value}
                 cursorColor={Colors.primary}
                 secureTextEntry={!see}
                 underlineColorAndroid="transparent"
                 placeholderTextColor={Colors.primary}
                 placeholder={placeholder}
                 onChangeText={onChangeText}
                 onBlur={onBlur}
                 keyboardType={keyboardType}
      />
      <TouchableOpacity style={styles.seeIconButton} onPress={switchSee}>
        <Icon color={Colors.primary} name={!see?Icons.see:Icons.unSee} size={wp('5%')}/>
      </TouchableOpacity>
    </View>
  );
};
export default CustomPasswordInput;
