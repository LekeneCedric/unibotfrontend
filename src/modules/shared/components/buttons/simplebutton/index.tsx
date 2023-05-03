import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Text from "../../native/text";
import styles from "../../../../auth/screens/welcome/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

type props = {
  text:string,
  func:((event: GestureResponderEvent) => void) | undefined;
}
const Simplebutton:React.FC<props> = ({text,func})=>{
  return <TouchableOpacity onPress={func} style={styles.button} >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
}
export default Simplebutton;
