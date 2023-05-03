import { Image, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Text from "../../native/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import styles from "./styles";

type props = {
  text:string,
  func:((event: GestureResponderEvent) => void) | undefined
}
const Googlebutton:React.FC<props> = ({text,func})=>{
  return <TouchableOpacity onPress={func} style={styles.button}>
    <Image source={require('../../../../../assets/images/welcome/google.png')} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
}
export default Googlebutton;
