import React, { useState } from "react";
import { TextInputProps, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native";
import Colors from "../../../../shared/theme/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icons from "../../../../shared/theme/icon";

type props = {
  placeholder:string,
  onChangeText: ((text: string) => void) | undefined,
}
const CustomPasswordInput:React.FC<props> =({placeholder,onChangeText})=>{
  const [see,setSee] = useState(false);
  const switchSee = ()=>{
    setSee(!see);
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
                 cursorColor={Colors.primary}
                 secureTextEntry={!see}
                 underlineColorAndroid="transparent"
                 placeholderTextColor={Colors.primary}
                 placeholder={placeholder} onChangeText={onChangeText} />
      <TouchableOpacity style={styles.seeIconButton} onPress={switchSee}>
        <Icon color={Colors.primary} name={!see?Icons.see:Icons.unSee} size={wp('5%')}/>
      </TouchableOpacity>
    </View>
  );
};
export default CustomPasswordInput;
